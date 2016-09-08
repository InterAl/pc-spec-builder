import Q from 'q';
import $ from 'jquery';

export default function imageFetcher(url, defaultUrl) {
    let deferred = Q.defer();

    $.get(url)
     .done(() => deferred.resolve(url))
     .fail(() => deferred.resolve(defaultUrl));

    return deferred.promise;
}
