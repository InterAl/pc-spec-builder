import _ from 'lodash';
import Q from 'q';
import 'whatwg-fetch';
import {setSpecOptions} from '../actions/setSpecOptions';
import {chooseSystem} from '../actions/chosenSystem';
import tsv from 'tsv';
import textEncoding from 'text-encoding';
import config from 'config';
import ga from '../googleAnalytics';
import queryString from 'query-string';
import {load} from '../persister';
import responsiveController from './responsiveController.js';

const {TextDecoder} = textEncoding;

export default function() {
    ga.init();

    ga.time('bootstrap');
    ga.time('fetch');

    return (dispatch, getState) => {
        dispatch(responsiveController());

        return Q.all([fetch(config.productsApiUrl),
                      fetch(config.systemsApiUrl)])
            .spread((productsResponse, systemsResponse) => {
                ga.timeEnd('fetch');
                ga.time('decode');

                return Q.all([
                    productsResponse.arrayBuffer(),
                    systemsResponse.json()
                ]);
            })
            .spread((productsBuffer, systemsJson) => {
                let productsTxt = new TextDecoder("windows-1255").decode(productsBuffer);
                ga.timeEnd('decode');
                ga.time('parse');

                return {
                    productsTxt,
                    systemsJson
                };
            })
            .then(parseFile)
            .then(plonterFileToSpecOptions)
            .then(specOptions => {
                const query = queryString.parse(location.search);
                const systemFromQuerystring = query.system && decodeURIComponent(query.system);

                if (systemFromQuerystring) {
                    const subsytemFromQuerystring = _.keys(_.get(specOptions.systems[systemFromQuerystring], 'subsystems'))[0];
                    dispatch(chooseSystem(systemFromQuerystring, subsytemFromQuerystring));
                } else {
                    const systemFromLs = load('chosenSystem');
                    const systemName = systemFromLs ? systemFromLs.systemName : null;
                    const subsystemName = systemFromLs ? systemFromLs.subsystem : null;
                    dispatch(chooseSystem(systemName, subsystemName));
                }

                dispatch(setSpecOptions(specOptions));
            })
            .then(() => ga.timeEnd('bootstrap'))
            .catch(err => console.error('failed bootstrapping', err));
    };
}

function parseFile({productsTxt, systemsJson}) {
    let regex = new RegExp(/<pre>(.*?)<\/pre>/g);
    let tsvTxt = "";
    let match = regex.exec(productsTxt);
    while (match != null) {
        tsvTxt += match[1] + "\n";
        match = regex.exec(productsTxt);
    }
    let tsvParsed = tsv.parse(tsvTxt);

    ga.timeEnd('parse');

    return {
        plonterProducts: tsvParsed,
        systems: systemsJson
    };
}

function plonterFileToSpecOptions({plonterProducts, systems}) {
    ga.time('build state');

    let products = [],
        categories = [],
        divisions = [],
        tags = {};

    function extractField(line, fieldName, arr) {
        let fieldId = _.findIndex(arr, l => l.name === line[fieldName]);

        if (fieldId === -1) {
            fieldId = arr.length;

            arr.push({
                name: line[fieldName],
                id: fieldId
            });
        }

        return fieldId;
    }

    function extractTags(line) {
        if (line.tree) {
            line.tree = line.tree.toString().toLowerCase();
            let lineTags = line.tree.toString().split(" ");
            _.each(lineTags, tag => {
                tags[tag] = tags[tag] || [];
                tags[tag].indexOf(line.division) === -1 && tags[tag].push(line.division);
            });

            return lineTags;
        }
    }

    for (let i=0; i < plonterProducts.length; i++) {
        let line = plonterProducts[i];
        let categoryId = extractField(line, 'division', categories);
        let divisionId = extractField(line, 'category', divisions);
        categories[categoryId].engdivision = categories[categoryId].engdivision || line.engdivision;
        let tags = extractTags(line);

        products.push({
            id: line.sku,
            name: line.title,
            fullName: line.title,
            manufacturer: line.description,
            categoryId,
            price: line.price_total,
            division: line.category,
            shelf: line.shelf,
            tags,
            popularity: line.amount ? -line.amount : Infinity
        });
    }

    _.each(systems.systems, s => {
        if (s.tags)
            s.tags = _.map(s.tags, t => t.toLowerCase());

        _.each(s.subsystems, (sub, key) => s.subsystems[key] = _.map(sub, t => t.toLowerCase()));
    });

    ga.timeEnd('build state');

    let result = {products, categories, tags, systems: systems.systems};
    return result;
}
