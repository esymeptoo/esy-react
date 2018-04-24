export default {
    getElementWidth: function(el) {
        var elementWidth = Math.max(
            el.scrollWidth,
            el.clientWidth,
            el.offsetWidth
        );
        var getElementWidth = function() {
            return elementWidth;
        };
        return getElementWidth();
    },

    getElementHeight: function(el) {
        var elementHeight = Math.max(
            el.scrollHeight,
            el.clientHeight,
            el.offsetHeight
        );
        var getElementHeight = function() {
            return elementHeight;
        };
        return getElementHeight();
    },

    isFunction: function(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
    },

    isNumber: function(n) {
        return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
    },

    hasClass: function(el, clazz) {
        return new RegExp("( |^)" + clazz + "( |$)").test(el.className);
    },

    addClass: function(el, clazz) {
        if (!this.hasClass(el, clazz)) {
            el.className += " " + clazz;
        }
    },

    rgbaToHex: function(color) {
        color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

        var hex = (color && color.length === 4) ? "#" +
            ("0" + parseInt(color[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(color[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(color[3], 10).toString(16)).slice(-2) : "";

        return hex.toUpperCase();
    },

    hexToRgba: function(color, a) {
        var hex = color[0] === "#" ? color.substr(1) : color,
            dig = hex.length / 3,
            red = hex.substr(0, dig),
            green = hex.substr(dig, dig),
            blue = hex.substr(dig * 2);
        if (dig === 1) {
            red += red;
            green += green;
            blue += blue;
        }
        return "rgba(" + parseInt(red, 16) + "," + parseInt(green, 16) + "," + parseInt(blue, 16) + "," + a + ")";
    },

    rgbToRgba: function(color, a) {
        return color.replace(")", ", " + a + ")").replace("(", "a(");
    },

    rgbaToRgb: function(color) {
        return color ?
            color.replace("rgba", "rgb").replace(/,[^\),]+\)/, ")") :
            "rgb(0,0,0)";
    },

    isFunction: function(functionToCheck) {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    },

    getProportion: function(array, nToFix) {
        let sum = array.reduce(function(a, b) {
            return a + b;
        }, 0);

        return array.map(function(item) {
            return parseFloat((item / sum).toFixed(nToFix || 2));
        });
    },

};
