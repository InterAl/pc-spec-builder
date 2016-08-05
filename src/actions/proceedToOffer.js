import _ from 'lodash';
import submitForm from 'submit-form';

export default function() {
    return (dispatch, getState) => {
        let plonterOffer = createPlonterOffer(getState());

        submitForm('http://www.plonter.co.il/buildyourownpc2.tmpl', {
            method: 'POST',
            body: plonterOffer
        });
    }
}

function createPlonterOffer(state) {
    return _.map(state.chosenProducts, p => ({
        [p.productId]: p.quantity
    }));
}
