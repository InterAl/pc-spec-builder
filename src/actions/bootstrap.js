import _ from 'lodash';
import Q from 'q';
import 'whatwg-fetch';
import {setSpecOptions} from '../actions/setSpecOptions';
import specOptions from '../specOptions';
import tsv from 'tsv';

export default function() {
    return dispatch => {
        return fetch('specOptions3.tsv')
            .then(response => response.text())
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

    function getSystems() {
        return [{
            id: 0,
            name: 'Maestro AiO',
            tags: ['0MAESTRO', 'DSSD', 'CHDD35', 'ACLV1050', 'CDDR3M', 'zzsoft', 'zzzservice', 'ZUPS']
        }, {
            id: 1,
            name: 'NUC',
            tags: ['06NUC', 'CHDD25', 'DDR4SODIM', 'DSSD25', 'DSSDM2SATA', 'zzsoft', 'zzzservice', 'ZUPS', 'ZNUCCABLES']
        }, {
            id: 2,
            name: 'NAS Builder',
            tags: ['0NAS', 'CHDD35NAS', 'DSSENTD25']
        }, {
            id: 3,
            name: 'Intel 6th Generation LGA1151 Skylake Series DDR4',
            subsystems: [{
                name: 'ATX',
                tags: ['AC1151', 'B11514ATX', 'B11514mATX', 'CDDR4D', 'CDISPLAY', 'ZLCD', 'EATXC', 'ZFANS', 'EATXPSU', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD35', 'ZLAN', 'NWIFI', 'ZSTICK']
            }, {
                name: 'ITX',
                tags: ['AC1151', 'ACLV11514', 'B11514ITX', 'CDDR4D', 'CDISPLAY', 'ZLCD', 'EITXC', 'ZFANS', 'EATXPSU', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD', 'ZLAN', 'NWIFI', 'ZSTICK']
            }, {
                name: 'HTPC',
                tags: ['AC1151', 'ACLV11514', 'B11514ITX', 'B11514ATX', 'B11514mATX', 'CDDR4D', 'CDISPLAY', 'ZLCD', 'EHTPC', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD35', 'ZLAN', 'NWIFI', 'ZFANS', 'ZSTICK']
            }]
        }, {
            id: 4,
            name: 'Intel 4th/5th Generation LGA1150 Haswell/Broadwell Series',
            subsystems: [{
                name: 'ATX',
                tags: ['AC1050', 'B1150ATX', 'B1150mATX', 'CDDR3D', 'CDISPLAY', 'ZLCD', 'EATXC', 'ZFANS', 'EATXPSU', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD35', 'ZLAN', 'NWIFI', 'ZSTICK']
            }, {
                name: 'ITX',
                tags: ['AC1050', 'ACLV1050', 'B1150ITX', 'CDDR3D', 'CDISPLAY', 'ZLCD', 'EITXC', 'ZFANS', 'EATXPSU', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD', 'ZLAN', 'NWIFI', 'ZSTICK']
            }, {
                name: 'HTPC',
                tags: ['AC1050', 'ACLV1050', 'B1150ATX', 'B1150mATX', 'CDDR3D', 'CDISPLAY', 'ZLCD', 'EHTPC', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD35', 'ZLAN', 'NWIFI', 'HTPC', 'ZFANS', 'ZSTICK']
            }]
        }, {
            id: 5,
            name: 'Intel LGA2011-3 Haswell-E Series X99 Chipset/DDR4',
            subsystems: [{
                name: 'ATX',
                tags: ['AC20113', 'CDDR4D', 'B20113ATX', 'EATXC', 'ZFANS', 'EATXPSU', 'CDISPLAY', 'ZLCD', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD35', 'ZLAN', 'NWIFI', 'ZSTICK']
            }]
        }, {
            id: 6,
            name: 'all Intel - PRO Users',
            tags: ['AC20113', '1151', 'CDDR4D', 'B20113ATX', '1050', '1150', '2011', 'CDISPLAY', 'ZLCD', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'DDR3', 'ATX', 'ZFANS', 'ITX', 'EMBD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD', 'ZLAN', 'NWIFI', 'ZSTICK']
        }, {
            id: 7,
            name: 'ITX Embedded systems Intel/AMD CPUs',
            tags: ['EMBD', 'DDR3', 'ITXC', 'CDISPLAY', 'ZLCD', 'ZKYBD', 'ZMOUSE', 'ZSOUND', 'ZVC', 'ZREMOTE', 'ZOPTICAL', 'ZMICEAR', 'DSSD', 'zzsoft', 'zzzservice', 'ZUPS', 'CHDD', 'ZLAN', 'NWIFI', 'ZSTICK']
        }];
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

        if (line.title && line.title.indexOf('Windows8.1') === 0)
            console.log(products[products.length - 1]);
    }

    let systems = getSystems();
    _.each(systems, s => {
        if (s.tags)
            s.tags = _.map(s.tags, t => t.toLowerCase());
        _.each(s.subsystems, sub => sub.tags = _.map(sub.tags, t => t.toLowerCase()));
    });
    let result = {products, categories, tags, systems};
    return result;
}
