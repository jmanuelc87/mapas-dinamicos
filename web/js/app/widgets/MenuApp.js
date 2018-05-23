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
            this.start();
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

        getMenu: function() {
            return this.pMenuBar;
        },

        clickEvent: function (event) {
            // TODO: show the respective production window.
            console.log(event.srcElement.innerText)
        }
    });
});