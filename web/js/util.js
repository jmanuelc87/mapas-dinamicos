define('js/util', [
    'require',
], function (require) {
    'use strict';

    var Util = {
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
                integer = Util.getCVEString(array[i], length);
                format += "'" + integer.toString() + "',";
            }

            integer = Util.getCVEString(array[array.length - 1], length);
            format += "'" + integer.toString() + "'";

            return format;
        },

        queryTaskWhere: function (field, start, end, length) {
            var where = field + ' IN (';
            var array = [];

            for (var i = start; i <= end; i++) {
                array.push(i);
            }

            where += Util.getStringFromArray(array, length);
            where += ')';

            return where;
        }
    }

    return Util;
});