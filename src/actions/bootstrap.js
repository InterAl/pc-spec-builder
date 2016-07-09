import Q from 'q';
import {setSpecOptions} from '../actions/setSpecOptions';
import specOptions from '../specOptions';

export default function() {
    return dispatch => {
        let deferred = Q.defer();
        deferred.resolve(specOptions);
        deferred.promise.then(spec => {
            dispatch(setSpecOptions(spec));
        });
    };
}
