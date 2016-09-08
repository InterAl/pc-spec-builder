import _ from 'lodash';
import submitForm from 'submit-form';

export default function() {
    return (dispatch, getState) => {
        let plonterOffer = createPlonterOffer(getState());

        submitForm('/buildyourownpcX2.tmpl', {
            method: 'POST',
            body: plonterOffer
        });
    }
}

function createPlonterOffer(state) {
    return _(state.chosenProducts)
                .filter(p => p.productId)
                .reduce((p, c) => ({
                    ...p,
                    [c.productId]: c.quantity
                }), {});
}
