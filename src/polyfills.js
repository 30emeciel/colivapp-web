void (function() {
    var _a, _b;
    var _c, _d;
    (_a = (_c = Array.prototype).groupBy) !== null && _a !== void 0 ? _a : (_c.groupBy = function (callback, thisArg) {
        var obj = {};
        this.forEach(function (value, idx, self) {
            var _a;
            var ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);
            ((_a = obj[ret]) !== null && _a !== void 0 ? _a : (obj[ret] = [])).push(value);
        });
        return obj;
    });
    (_b = (_d = Array.prototype).groupByToMap) !== null && _b !== void 0 ? _b : (_d.groupByToMap = function (callback, thisArg) {
        var map = new Map();
        this.forEach(function (value, idx, self) {
            var ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);
            var group = map.get(ret) || [];
            if (group.push(value) === 1)
                map.set(ret, group);
        });
        return map;
    });
    (_b = (_d = Array.prototype).groupByToMapUnique) !== null && _b !== void 0 ? _b : (_d.groupByToMapUnique = function (callback, thisArg) {
        var map = new Map();
        this.forEach(function (value, idx, self) {
            var ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);
            map.set(ret, value);
        });
        return map;
    });
})()