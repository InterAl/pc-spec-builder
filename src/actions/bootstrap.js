import _ from 'lodash';
import Q from 'q';
import 'whatwg-fetch';
import {setSpecOptions} from '../actions/setSpecOptions';
import systemOptions from '../systemOptions';
import tsv from 'tsv';
import textEncoding from 'text-encoding';

const {TextDecoder} = textEncoding;

export default function() {
    return dispatch => {
        return fetch('http://www.plonter.co.il/pnp/alon.tmpl')
        .then(response => {
           return response.arrayBuffer();
        })
        .then(buf => {
            let text = new TextDecoder("windows-1255").decode(buf);
            return text;
        })
        .then(parseFile)
        .then(plonterFileToSpecOptions)
        .then(specOptions => dispatch(setSpecOptions(specOptions)));
    };
}

function parseFile(text) {
    let regex = new RegExp(/<pre>(.*?)<\/pre>/g);
    let tsvTxt = "";
    let match = regex.exec(text);
    while (match != null) {
        tsvTxt += match[1] + "\n";
        match = regex.exec(text);
    }
    let tsvParsed = tsv.parse(tsvTxt);
    return tsvParsed;
}

function plonterFileToSpecOptions(plonter) {
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

    for (let i=0; i < plonter.length; i++) {
        let line = plonter[i];
        let categoryId = extractField(line, 'division', categories);
        let divisionId = extractField(line, 'category', divisions);
        let tags = extractTags(line);

        products.push({
            id: line.sku,
            name: line.title && line.title.substring(0, 85),
            fullName: line.title,
            manufacturer: line.description,
            categoryId,
            price: line.price_total,
            division: line.category,
            tags
        });
    }

    _.each(systemOptions, s => {
        if (s.tags)
            s.tags = _.map(s.tags, t => t.toLowerCase());
        _.each(s.subsystems, sub => sub.tags = _.map(sub.tags, t => t.toLowerCase()));
    });

    let result = {products, categories, tags, systems: systemOptions};
    return result;
}
