import _ from 'lodash';
import submitForm from 'submit-form';
import ga from '../googleAnalytics';

export default function() {
    ga.sendEvent({action: 'offer'});

    return (dispatch, getState) => {
        const state = getState();
        let plonterOffer = createPlonterOffer(state);

        submitForm('/buildyourownpcX2.tmpl', {
            method: 'POST',
            body: plonterOffer
        });
    }
}

function createPlonterOffer(state) {
    return _(state.chosenProducts)
                .filter(p => p.productId)
                .sortBy(['idx', 'time'])
                .reduce((p, c) => ({
                    ...p,
                    [c.productId]: c.quantity
                }), {});
}
