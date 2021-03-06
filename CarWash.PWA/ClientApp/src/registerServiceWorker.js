﻿// const isLocalhost = Boolean(
//     window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );

export default function register() {
    if (!('serviceWorker' in navigator)) {
        console.log("Boo! This browser doesn't support Service Workers 😬");

        // Internet Explorer 6-11
        const isIE = /* @cc_on!@*/ false || !!document.documentMode;
        const surpassIEBlock = window.location.href.search('surpassieblock') !== -1;

        if (isIE && !surpassIEBlock) window.location = '/ieblock.html';
        return;
    }

    if (navigator.serviceWorker.controller) {
        console.log('Active service worker found, no need to register.');
    } else {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
            return;
        }

        // Register the ServiceWorker
        navigator.serviceWorker
            .register('sw.js', {
                scope: './',
            })
            .then(registration => {
                console.log(`Service worker has been registered for scope: ${registration.scope}`);
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // At this point, the old content will have been purged and
                                // the fresh content will have been added to the cache.
                                // It's the perfect time to display a "New content is
                                // available; please refresh." message in your web app.
                                console.log('New content is available; please refresh.');
                            } else {
                                // At this point, everything has been precached.
                                // It's the perfect time to display a
                                // "Content is cached for offline use." message.
                                console.log('Content is cached for offline use.');
                            }
                        }
                    };
                };
            })
            .catch(error => {
                console.error('Error during service worker registration: ', error);
            });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
