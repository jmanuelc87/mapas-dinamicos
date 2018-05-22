define([
    'require',
    'dojo/_base/declare',
    'dojo/dom',

    'app/widgets/LayoutApp',
    'app/widgets/MenuApp',
    'app/widgets/Webmap',
], function (require, declare, dom, LayoutApp, MenuApp, Webmap) {
    'use strict';

    return declare('app.MainApp', [], {

        constructor: function () {
            console.log('Hola Mundo!');
        },

        start: function () {
            var layout = new LayoutApp();
            var menus = new MenuApp();
            var map = new Webmap();
            layout.start();
            menus.start();
            map.start();

            layout.addMenu(menus.pMenuBar);
            layout.addMap(map.esriMapView);
            
        },

    });
});