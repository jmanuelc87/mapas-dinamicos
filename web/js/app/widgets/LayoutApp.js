define([
    'require',
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',

    'dijit/layout/BorderContainer',
    'dijit/layout/ContentPane'
], function (require, declare, dom, domConstruct, BorderContainer, ContentPane) {
    'use strict';

    return declare('app.widgets.LayoutApp', [], {

        constructor: function () {
        },

        start: function () {
            this.bc = new BorderContainer({
                style: 'height: 100%; width: 100%;'
            });

            this.footer = new ContentPane({
                region: 'bottom'
            });
            this.bc.addChild(this.footer);

            this.center = new ContentPane({
                region: 'center'
            });
            this.bc.addChild(this.center);

            this.bc.placeAt(dom.byId('app'));
            this.bc.startup();
        },

        addMenu: function (menuBar) {
            this.bc.addChild(menuBar);
        },

        addMap: function (webmap) {
            var div1 = domConstruct.create('div', { id: 'webmap-001', style: 'height: 100%;' }, this.center.containerNode);
            webmap.set('container', div1);
        }
    });
});