define([
    'require',
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/on',

    'dijit/MenuBar',
    'dijit/PopupMenuBarItem',
    'dijit/DropDownMenu',
    'dijit/MenuItem'
], function (require, declare, dom, on, MenuBar, PopupMenuBarItem, DropDownMenu, MenuItem) {
    'use strict';

    return declare('app.widgets.MenuApp', [], {

        constructor: function () {
        },

        start: function () {
            this.pMenuBar = new MenuBar({
                region: 'top'
            });

            var pSubMenu = new DropDownMenu({});
            var agricola = new MenuItem({
                label: "Agícola",
            });
            pSubMenu.addChild(agricola);

            var pecuario = new MenuItem({
                label: "Pecuario"
            });
            pSubMenu.addChild(pecuario);

            var pesquero = new MenuItem({
                label: "Pesquero"
            });
            pSubMenu.addChild(pesquero);

            this.pMenuBar.addChild(new PopupMenuBarItem({
                label: "Estadísticas",
                popup: pSubMenu,
            }));

            var that = this;

            on(agricola, 'click', function (event) {
                that.clickEvent(event);
            });

            on(pesquero, 'click', function (event) {
                that.clickEvent(event);
            });

            on(pecuario, 'click', function (event) {
                that.clickEvent(event);
            });

        },

        clickEvent: function (event) {
            // TODO: show the respective window.
            console.log(event.srcElement.innerText)
        }
    });
});