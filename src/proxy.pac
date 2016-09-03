function FindProxyForURL(url, host) {

    if (url.indexOf('plonter.co.il/app.js') !== -1) {
        return 'PROXY localhost:4242';
        /* return 'DIRECT' */
    }

    return 'DIRECT';
}
