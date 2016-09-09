let timers = {};

function init() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-83922038-1', 'auto');
    ga('send', 'pageview');
}

function sendEvent({action, label, value, fields}) {
    ga('send', 'event', 'SpecBuilder', action, label, value, fields);
}

function time(key) {
    timers[key] = new Date();
}

function timeEnd(key) {
    let end = new Date();
    let start = timers[key];
    let ms = end - start;
    console.log(`[timer] ${key}: ${ms} ms`);
    sendEvent({action: key, value: ms});
}

export default {
    init,
    sendEvent,
    time,
    timeEnd
}
