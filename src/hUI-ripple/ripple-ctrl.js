import utils from "./hUI-utils";

export default RippleCtrl
/**
* @param {object=} element The element the ripple effect should be applied to
* @param {object=} options (Optional) Configuration options to override the defaultRipple configuration
* * `center` -  Whether the ripple should start from the center of the container element
* * `dimBackground` - Whether the background should be dimmed with the ripple color
* * `fitRipple` - Whether the ripple should fill the element
*/
function RippleCtrl(element, rippleOptions) {
    var self = this;

    this.element = element;
    this.options = rippleOptions;
    this.mousedown = false;
    this.ripples = [];
    this.timeout = null;
    this.lastRipple = null;
    this.opacity = 0.1;
    this.duration = 300;

    // 第一次使用时创建
    (function(){
        var value = null;
        Object.defineProperty(self, "container", {
            get: function () {
                if (value === null) {
                    value = self.createContainer.call(self);
                }
                return value;
            }
        });
    })();

    if (this.element) {
        utils.addClass(this.element, "hui-ripple");
        this.bindEvents();
    }
}

function autoCleanup (self, cleanupFn) {
    if ( self.mousedown || self.lastRipple ) {
        self.mousedown = false;
        setTimeout(cleanupFn.bind(self), 0, false);
    }
}

RippleCtrl.prototype.bindEvents = function () {
    this.element.addEventListener("mousedown", this.handleMousedown.bind(this));
    this.element.addEventListener("mouseup", this.handleMouseup.bind(this));
    this.element.addEventListener("touchend", this.handleMouseup.bind(this));
    this.element.addEventListener("mouseleave", this.handleMouseup.bind(this));
    this.element.addEventListener("touchmove", this.handleTouchmove.bind(this));
};

RippleCtrl.prototype.calculateColor = function () {
    var self = this;
    // 1. color in attr hui-ripple 2. element color 3. white
    return parseColor(self.ripple()|| self.options.color || getElementColor() || "#FFFFFF");

    function getElementColor () {
        return getComputedStyle(self.element).color || getComputedStyle(self.element).backgroundColor;
    }

    function parseColor (color) {
        if (!color) {
            return;
        }
        if (color.indexOf("rgba") === 0) {
            return color.replace(/\d?\.?\d*\s*\)\s*$/, (self.opacity).toString() + ")");
        }
        if (color.indexOf("rgb") === 0) {
            return utils.rgbToRgba(color, self.opacity);
        }
        if (color.indexOf("#") === 0) {
            return utils.hexToRgba(color, self.opacity);
        }
    }
};

RippleCtrl.prototype.createContainer = function() {
    var container = document.createElement("div");
    utils.addClass(container, "hui-ripple-container");
    this.element.appendChild(container);
    return container;
};


RippleCtrl.prototype.handleMousedown = function(event) {
    if (this.mousedown) {
        return;
    }
    this.mousedown = true;

    if (this.options.center) {
        this.createRipple(utils.getElementWidth(this.container) / 2, utils.getElementHeight(this.container) / 2);
    } else {
        if (event.srcElement !== this.element) {
            var layerRect = this.element.getBoundingClientRect();
            var layerX = event.clientX - layerRect.left;
            var layerY = event.clientY - layerRect.top;

            this.createRipple(layerX, layerY);
        } else {
            this.createRipple(event.offsetX, event.offsetY);
        }
    }
    // debugger;

};

RippleCtrl.prototype.handleMouseup = function () {
    autoCleanup(this, this.clearRipples);
};

RippleCtrl.prototype.handleTouchmove = function () {
    autoCleanup(this, this.deleteRipples);
};

RippleCtrl.prototype.isRippleAllowed = function () {
    var element = this.element;
    do {
        if (!element.tagName || element.tagName === "BODY") {
            break;
        }

        if (element && utils.isFunction(element.hasAttribute)) {
            if (element.hasAttribute("disabled")) {
                return false;
            }
            if (this.ripple() === "false" || this.ripple() === "0") {
                return false;
            }
        }

    } while (element = element.parentNode);
    return true;
};

RippleCtrl.prototype.ripple = function () {
    return this.element.getAttribute("hui-ripple");
};

RippleCtrl.prototype.clearTimeout = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

RippleCtrl.prototype.clearRipples = function () {
    for (var i = 0; i < this.ripples.length; i++) {
        this.fadeInComplete(this.ripples[i]);
    }
};

RippleCtrl.prototype.createRipple = function(left, top) {
    this.createTime = new Date();
    if (!this.isRippleAllowed()) {
        return;
    }
    var ctrl = this;
    var width = utils.getElementWidth(this.element);
    var height = utils.getElementHeight(this.element);
    var x = Math.max(Math.abs(width - left), left) * 2;
    var y = Math.max(Math.abs(height - top), top) * 2;
    var size = getSize(this.options.fitRipple, x, y);
    var color = this.calculateColor();
    var ripple = document.createElement("div");
    utils.addClass(ripple, "ripple");
    this.lastRipple = ripple;

    ripple.style.left = left + "px";
    ripple.style.top = top + "px";
    ripple.style.background = "black";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.backgroundColor = utils.rgbaToRgb(color);
    ripple.style.borderColor = utils.rgbaToRgb(color);

    this.clearTimeout();
    this.timeout = setTimeout(function(){
        ctrl.clearTimeout();
        if (!ctrl.mousedown) {
            ctrl.fadeInComplete(ripple);
        }
    }, this.duration , false);

    if (this.options.dimBackground) {
        this.container.style.backgroundColor = color;
    }
    this.container.appendChild(ripple);
    this.ripples.push(ripple);
    utils.addClass(ripple, "ripple-placed");

    setTimeout(function(){
        utils.addClass(ripple, "ripple-scaled ripple-acv");
        setTimeout(function(){
            ctrl.clearRipples();
        }, ctrl.duration * 3, false);
    }, 0, false);

    function getSize (fit, x, y) {
        return fit
            ? Math.max(x, y)
            : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
};

RippleCtrl.prototype.fadeInComplete = function (ripple) {
    if (this.lastRipple === ripple) {
        if (!this.timeout && !this.mousedown) {
            this.removeRipple(ripple);
        }
    } else {
        this.removeRipple(ripple);
    }
};

RippleCtrl.prototype.removeRipple = function (ripple) {
    var ctrl  = this;
    var index = this.ripples.indexOf(ripple);
    if (index < 0) {
        return;
    }
    this.ripples.splice(this.ripples.indexOf(ripple), 1);
    ripple.classList.remove("ripple-acv");
    utils.addClass(ripple, "ripple-not-acv");
    if (this.ripples.length === 0) {
        this.container.style.backgroundColor = "";
    }
    // use a 2-second timeout in order to allow for the animation to finish
    // we don't actually care how long the animation takes
    setTimeout(function () {
        ctrl.fadeOutComplete(ripple);
    }, this.duration, false);
};

RippleCtrl.prototype.fadeOutComplete = function (ripple) {
    ripple.remove();
    this.lastRipple = null;
};

RippleCtrl.prototype.clearRipples = function () {
    for (var i = 0; i < this.ripples.length; i++) {
        this.fadeInComplete(this.ripples[i]);
    }
};

RippleCtrl.prototype.deleteRipples = function () {
    for (var i = 0; i < this.ripples.length; i++) {
        this.ripples[i].remove();
    }
};
