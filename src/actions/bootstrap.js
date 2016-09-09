import _ from 'lodash';
import Q from 'q';
import 'whatwg-fetch';
import {setSpecOptions} from '../actions/setSpecOptions';
import tsv from 'tsv';
import textEncoding from 'text-encoding';
import config from 'config';
import ga from '../googleAnalytics';

const {TextDecoder} = textEncoding;

export default function() {
    ga.init();

    ga.time('bootstrap');
    ga.time('fetch');

    return dispatch => {
        return Q.all([fetch(config.productsApiUrl),
                      fetch(config.systemsApiUrl)])
            .spread((productsResponse, systemsResponse) => {
                ga.timeEnd('fetch');

                return Q.all([
                    productsResponse.arrayBuffer(),
                    systemsResponse.json()
                ]);
            })
            .spread((productsBuffer, systemsJson) => {
                let productsTxt = new TextDecoder("windows-1255").decode(productsBuffer);

                return {
                    productsTxt,
                    systemsJson
                };
            })
            .then(parseFile)
            .then(plonterFileToSpecOptions)
            .then(specOptions => dispatch(setSpecOptions(specOptions)))
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


    return {
        plonterProducts: tsvParsed,
        systems: systemsJson
    };
}

function plonterFileToSpecOptions({plonterProducts, systems}) {
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

    let result = {products, categories, tags, systems: systems.systems};
    return result;
}
