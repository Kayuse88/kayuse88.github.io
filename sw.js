/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","c0b3c14d4245546c0383ec5a75498470"],["/about/index.html","0fdba6c6cfbcb00c351c3e6090412a18"],["/assets/css/main.css","c378680064342987a10c5bd38477ad9d"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","46d089384d19077a7990aa13bbb16643"],["/assets/img/icons/icon-instagram.svg","386f48e7440160096385614b2ec91930"],["/assets/img/icons/icon-twitter.svg","d2508d22e42c11e177ae430d33b343d9"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","5aa56ac96362cc1bb12c2848a6b6c1b7"],["/assets/img/posts/binary-heap/Heap_add_step1.svg","12e315f579bb9b935ca938ad1cc7057d"],["/assets/img/posts/binary-heap/Heap_add_step2.svg","9adaa01d8ba3f0e906d31f14863049ef"],["/assets/img/posts/binary-heap/Heap_add_step3.svg","4d6c6554c8fde58b0a5c7b7f2fd37a9e"],["/assets/img/posts/binary-heap/Heap_delete_step1.svg","6f29faa088f2980ce34d0410db5d5bc3"],["/assets/img/posts/binary-heap/Heap_delete_step2.svg","3ff2780e851da569aa140aefbd14989f"],["/assets/img/posts/binary-heap/Heap_delete_step3.svg","a05d8dc485507b8d251122c5e27a480c"],["/assets/img/posts/dfs-bfs/Breadth-first-tree.svg","47fef7f01ddee42f34cd32261456b4bb"],["/assets/img/posts/dfs-bfs/Depth-first-tree.svg","724837cb2b82467114d48daf9500252d"],["/assets/img/posts/dfs-bfs/apeach.png","5e0707ddeababe4d83a8d09e077b047d"],["/assets/img/posts/dfs-bfs/dfsexample.png","7b8a705ccd7c7c8b63686f29236ecdef"],["/assets/img/posts/difference-wait-await/bar-1846137_1920.jpg","8e1e8d97a2ced1c3e8a1a758c18f74c7"],["/assets/img/posts/haversine/RhumbLine-GreatCircle.png","cc4d090d40bd7ca759f17b1eea2a18cf"],["/assets/img/posts/haversine/archaversine.svg","a595ebb80cb1d5aaf472c1231651e25d"],["/assets/img/posts/haversine/centralangle.svg","d03e07256bbd9e25a751e5ae2be4e00d"],["/assets/img/posts/haversine/googlemapmeasure.png","80b008974b9d552861e1ffe1249c2780"],["/assets/img/posts/haversine/googlemaps.png","4f98468065d023295acfd3029629a011"],["/assets/img/posts/haversine/googlemeasure.png","80b008974b9d552861e1ffe1249c2780"],["/assets/img/posts/haversine/haversineformula.svg","23a455f5cea4cd7a3789aec91bc7cae5"],["/assets/img/posts/haversine/haversinefunction.svg","d6fdfed1122009e1adb8bb43d0b9123c"],["/assets/img/posts/haversine/kakaomap.png","a0952a0714bea307d4d9a430ef998cd2"],["/assets/img/posts/haversine/measuredistance.png","4759858389d9807cde2936063bcc7124"],["/assets/img/posts/haversine/pythagorean.png","84fe2c64eec8a9b32c35d8b68d3a1a41"],["/assets/img/posts/haversine/solve.svg","481c63ab834a4c30073fb89917111f8e"],["/assets/img/posts/introduce-uwp/Windows_Cortana_v20_1920_LaunchCortana_img.jpg","c3e5e0b244ac034bddeabd55fdd9024d"],["/assets/img/posts/introduce-uwp/hig-device-primer.png","a576d782ddca2a62c6cbd2bf33076bca"],["/assets/img/posts/introduce-uwp/microsoft-store.png","5f10e18fc7d1fab2c430a6249845a0d0"],["/assets/img/posts/introduce-uwp/programuninstall.png","1085a5b81d149a2227563f9848f6671f"],["/assets/img/posts/introduce-uwp/universalapps-overview.png","cbe5a32a1f41ed592ab026a16a531ff1"],["/assets/img/posts/introduce-uwp/win10-calc.png","c138b929a4f872fbd3827cf2b5641ca8"],["/assets/img/posts/longest-common-substring/lgsmatrix.png","bac3a30c0564fa6a07da4ff93f9e7cf7"],["/assets/img/posts/mvvm-example/tictactoe.png","a26d3c65a93d193072c89cb0a76f868b"],["/assets/img/posts/mvvm-example/tictactoemvc.png","75dbf3abab8e983840d80cf776d664c8"],["/assets/img/posts/mvvm-example/tictactoemvp.png","a7dd2485e604e716493b9954d7a002ad"],["/assets/img/posts/mvvm-example/tictactoemvvm.png","e5601b813cdc5cf767b2eddf0773093a"],["/assets/img/posts/mvvm-framework/caliburnmicro.png","a22589d3aa09c07b447a55907e8f991c"],["/assets/img/posts/mvvm-framework/mvvmlight.png","20f4f5381e71b21c22a343f6c238e5fe"],["/assets/img/posts/mvvm-framework/prismlibrary.png","ab6db7325ede983e912a065a8aa9d6f1"],["/assets/img/posts/mvvm-pattern/dotnet5_platform.png","7c0fd1fb22f876d67187bed69c89f39c"],["/assets/img/posts/mvvm-pattern/msdn-mvvm-pattern.png","1afe20bab0052f5ab0fc400bf3b6f3f7"],["/assets/img/posts/mvvm-pattern/mvcpattern.png","681e204d46a86fb235f64bbf1bf0e212"],["/assets/img/posts/mvvm-pattern/mvppattern.png","2e2ac6c5b41f962f06652e14049b43ae"],["/assets/img/posts/mvvm-pattern/mvvmpattern.png","2c4071103fabccea02adf936787f9cde"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/img/posts/whatsnew-cs8/cs8logo.png","cb2db045939b35124fa3f562799c14b5"],["/assets/js/bundle.js","6f37d89f6978afc9ebaf7fa685c83a2c"],["/binary-heap/index.html","fcc7e818e315ce2e99e5579282774523"],["/categories/index.html","66c7614ea87c4d4e4d0b2ac2e85de00f"],["/contact/index.html","b19972afa0838e43c97f2f236759d8a8"],["/dfs-bfs/index.html","7c423272fad7e6d71d3ec7c5326d7eae"],["/difference-wait-await/index.html","fe9b0af38590a55697322a678fe792a7"],["/dotnet-testframework/index.html","410b2cca5909829640e5d197a0c9c33f"],["/gcd-lcm/index.html","88714dd991c0a1861d05536f0aabc0b0"],["/google624b6fc4f1422317.html","876e2d649813c6586377b339c485638f"],["/gulpfile.babel.js","0465aac1c476bd34205c0ffc757eb4b9"],["/haversine/index.html","19bd168beab58593e51444c3389e67b3"],["/index.html","58b45c1af29f62bb591a429ff5bc7f50"],["/introduce-uwp/index.html","8e63eb6c8bf42457da448e76562bb940"],["/longest-common-substring/index.html","32d2a3e10e787710b0f6e566514fa8ac"],["/mvvm-example/index.html","0102adf93f90711d71396c6d104d440c"],["/mvvm-framework/index.html","d721a9ca0a0bc9e5ca046b3e18ea114d"],["/mvvm-pattern/index.html","8a501c27e00459d72170ca86c71578da"],["/sw.js","2aab1cb842b82ac8dfc99d8cc6597e8e"],["/whatsnew-cs8/index.html","71fb3ccd06c13156ad3c7a0bfcb0abbe"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







