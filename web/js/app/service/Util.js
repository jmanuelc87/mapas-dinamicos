define([
    'require',
    'dojo/_base/declare'
], function (require, declare) {
    'use strict';


    return declare('app.service.Util', [], {
        getCVEString: function (cve, length) {
            var format = '';
            for (var i = format.length; i < length - cve.toString().length; i++) {
                format += '0';
            }
            return format + cve.toString();
        },

        getStringFromArray: function (array, length) {
            var format = '';
            var integer;

            for (var i = 0; i < array.length - 1; i++) {
                integer = this.getCVEString(array[i], length);
                format += "'" + integer.toString() + "',";
            }

            integer = this.getCVEString(array[array.length - 1], length);
            format += "'" + integer.toString() + "'";

            return format;
        },

        queryTaskWhere: function (field, start, end, length) {
            var where = field + ' IN (';
            var array = [];

            for (var i = start; i <= end; i++) {
                array.push(i);
            }

            where += this.getStringFromArray(array, length);
            where += ')';

            return where;
        }
    });
});