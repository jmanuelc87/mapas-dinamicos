define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!../templates/WindowModal.html",
    "dojo/dom-style",
    "dojo/dom",
    "dojo/on",
    "dijit/a11yclick",
    "dojo/window",
    "dojo",
], function (declare, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, template, domStyle, dom, on, a11yclick, window, dojo) {

    return declare('app.widgets.WindowModal', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: 'modal',
        _isVisible: false,

        constructor: function (args) {
            if (args != undefined) {
                if (args.height != undefined) {
                    this.height = args.height;
                }
                if (args.width != undefined) {
                    this.width = args.width;
                }
            }
        },

        show: function () {
            domStyle.set(this.domNode, 'display', 'block');
        },

        postCreate: function () {

            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            domStyle.set(this.domNode, 'display', 'none');
            domStyle.set(this.domNode, 'width', this.width);
            domStyle.set(this.domNode, 'height', this.height);

            // apunta al objeto principal
            var that = this;

            // agregar un evento mousedown en la barra de titulo
            var signalMouseDown = on(this.domNode, '.modal-header:mousedown', function (event) {
                event = event || window.event;
                pos3 = event.clientX;
                pos4 = event.clientY;

                var signalMouseMove = on(document, 'mousemove', function (e) {
                    e = e || window.event;
                    // calcular la nueva posicion del cursor
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;

                    var coords = dojo.coords(that.domNode);
                    var vs = window.getBox();

                    // evita la salida de la ventana fuera de los rangos permitidos
                    if (coords.y - pos2 < 0 || coords.y - pos2 >= vs.h) {
                        signalMouseMove.remove();
                    }

                    if (coords.x - pos1 < 0 || coords.x - pos1 >= vs.w) {
                        signalMouseMove.remove();
                    }

                    // colocar el elemento en la nueva posicion
                    domStyle.set(that.domNode, 'top', (coords.y - pos2) + 'px')
                    domStyle.set(that.domNode, 'left', (coords.x - pos1) + 'px')
                });

                var signalMouseUp = on(document, 'mouseup', function () {
                    signalMouseUp.remove();
                    signalMouseMove.remove();
                });
            });
        },

        onCloseHandle: function (event) {
            dojo.destroy(this.id);
        },

        onMinimizeHandle: function (event) {
            domStyle.set(this.domNode, 'width', '120px');
            domStyle.set(this.domNode, 'height', '34px');
        },

        onMaximizeHandle: function (event) {
            this.width = this.width || '500px';
            this.height = this.height || '400px';
            domStyle.set(this.domNode, 'width', this.width);
            domStyle.set(this.domNode, 'height', this.height);
        }
    });

});