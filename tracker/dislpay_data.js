'use strict';

var Table = require('cli-table');
var MAX_BAR_LEN = 100;



function displayBar(data, config) {
    var color = config.color;
    var total = 0, dataNew = [];
    var order = config.order;
    if (order === 'desc') {
        data = data.sort(function (a, b) {
            return b.count - a.count;
        });
    } else if (order === 'asc') {
        data = data.sort(function (a, b) {
            return a.count - b.count;
        });
    }
    if (Object.prototype.toString.call(data) === '[object Object]') {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
            dataNew.push({
                label: key,
                count: data[key]
            });
        });
        data = dataNew;
    }
    data.forEach(function (l) {
        total += l.count;
    });
    var maxStringLen = getMaxStringLen(data, function (d) {
        return getStrLen(d.label);
    });
    data.forEach(function (l) {
        var percent = l.count / total;
        var hours = (l.count / 60).toFixed(2);
        var output = formatLabel(l.label, maxStringLen).bold + '  ' + bar(percent)[color || 'blue'] + ' ' + (hours+'h').cyan;
        console.log(output);
    });
}


function bar(percent) {
    var barLen = parseInt(percent * MAX_BAR_LEN, 10);
    var barStr = '';
    while(barLen > 0) {
        barStr += '▋';
        barLen--;
    }
    return barStr;
}

function getMaxStringLen(data, getTarget) {
    var maxStringLen = 0;
    //the default getTarget function is prepare for data like ['string1', 'string2']
    getTarget = getTarget || function (d) { return d.length; };
    data.forEach(function (d) {
        var len = getTarget(d);
        maxStringLen = len > maxStringLen ? len : maxStringLen;
    });
    return maxStringLen;
}

function formatLabel(l, maxStringLen) {
    var len = getStrLen(l);
    var gap = maxStringLen - len;
    l = space(gap) + l + ' ';
    return l;
}

function getStrLen(str) {
    var regex = /[\u4E00-\u9FA5]+/g;
    var chinese = str.match(regex);
    var chineseLen;
    if (chinese) {
        chinese = chinese[0];
    }
    chineseLen = chinese ? chinese.length: 0;
    var engLen = str.replace(regex, '').length;
    return engLen + 2 * chineseLen;
}

function space(l) {
    var str = '';
    while(l > 0) {
        str += ' ';
        l--;
    }
    return str;
}


function displayTable(config) {
    var table = new Table({
        head: config.head,
        colWidth: config.colWidth
    });

    config.data.forEach(function (row) {
        table.push(row);
    });

    console.log(table.toString());
}

exports.bar = displayBar;
exports.table = displayTable;
