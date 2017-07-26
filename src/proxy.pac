function FindProxyForURL(url, host) {
    if (url.indexOf('plonter.co.il/spec-app.js') !== -1) {
        return 'PROXY localhost:4242';
        /* return 'DIRECT' */
    } else if (url.indexOf('plonter.co.il/laptop-app.js') !== -1) {
        return 'PROXY localhost:4242';
    }

    return 'DIRECT';
}
