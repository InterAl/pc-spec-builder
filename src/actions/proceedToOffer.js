import _ from 'lodash';
import submitForm from 'submit-form';

export default function() {
    return (dispatch, getState) => {
        let plonterOffer = createPlonterOffer(getState());

        submitForm('http://www.plonter.co.il/buildyourownpcX2.tmpl', {
            method: 'POST',
            body: plonterOffer
        });
    }
}

function createPlonterOffer(state) {
    return _.reduce(state.chosenProducts, (p, c) => ({
        ...p,
        [c.productId]: c.quantity
    }), {});
}
