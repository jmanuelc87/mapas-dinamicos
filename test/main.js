(function (window) {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP_01 = /.*\.spec\.js$/;
    var TEST_REGEXP_02 = /.*\.spec\.ts$/

    for (var file in window.__karma__.files) {
        if (TEST_REGEXP_01.test(file) || TEST_REGEXP_02.test(file)) {
            allTestFiles.push(file);
        }
    }

    var arcgisUrl = "https://js.arcgis.com/4.7";

    window.dojoConfig = {
        packages: [
            {
                name: 'base',
                location: '/base/dist'
            },
            {
                name: 'services',
                location: '/base/dist/services'
            },
            {
                name: "esri",
                location: arcgisUrl + "/esri",
            },
            {
                name: "@dojo",
                location: arcgisUrl + "/@dojo",
            },
            {
                name: "cldrjs",
                location: arcgisUrl + "/cldrjs",
            },
            {
                name: "globalize",
                location: arcgisUrl + "/globalize",
            },
            {
                name: "tslib",
                location: arcgisUrl + "/tslib",
            },
            {
                name: "moment",
                location: arcgisUrl + "/moment",
            },
            {
                name: "dojo",
                location: arcgisUrl + "/dojo",
            },
            {
                name: "dijit",
                location: arcgisUrl + "/dijit",
            },
            {
                name: "dojox",
                location: arcgisUrl + "/dojox",
            },
            {
                name: "dstore",
                location: arcgisUrl + "/dojo-dstore",
            },
            {
                name: "maquette",
                location: arcgisUrl + "/maquette",
            },
            {
                name: "maquette-css-transitions",
                location: arcgisUrl + "/maquette-css-transitions",
            },
            {
                name: "maquette-jsx",
                location: arcgisUrl + "/maquette-jsx",
            }
        ],

        map: {
            globalize: {
                cldr: "cldrjs/dist/cldr",
                "cldr/event": "cldrjs/dist/cldr/event",
                "cldr/supplemental": "cldrjs/dist/cldr/supplemental",
                "cldr/unresolved": "cldrjs/dist/cldr/unresolved"
            }
        },

        async: true,

        has: {
            "dojo-config-api": 1, // Don't need the config API code in the embedded Dojo loader
            "esri-promise-compatibility": 1,
            "esri-webpack": 0,
            "esri-featurelayer-webgl": 1
        }
    };

    window.__karma__.dojoStart = function () {
        return allTestFiles;
    }
})(window);