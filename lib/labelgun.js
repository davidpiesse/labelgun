(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rbush"));
	else if(typeof define === 'function' && define.amd)
		define(["rbush"], factory);
	else if(typeof exports === 'object')
		exports["labelgun"] = factory(require("rbush"));
	else
		root["labelgun"] = factory(root["rbush"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rbush = __webpack_require__(0);

var _rbush2 = _interopRequireDefault(_rbush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var labelgun = function () {
  function labelgun(hideLabel, showLabel) {
    _classCallCheck(this, labelgun);

    this.tree = (0, _rbush2.default)(6);
    this.allLabels = {};
    this._point = undefined;
    this.hasChanged = new Set();
    this.loaded = false;
    this.allChanged = false;
    this.hideLabel = hideLabel;
    this.showLabel = showLabel;
    var self = this;
  }

  /**
   * @name destroy
   */


  _createClass(labelgun, [{
    key: "destroy",
    value: function destroy() {
      this.resetTree();
      this.allLabels = {};
    }

    /**
     * @name forceLabelStates
     * @summary Allows you to set a state for all current labels
     * @param {boolean} forceUpdate if true, adds entities to lazy render queue
     * @param {string} forceState the class of which to change the label to
     * @returns {undefined}
     */

  }, {
    key: "forceLabelStates",
    value: function forceLabelStates(forceUpdate, forceState) {
      var _this = this;

      this.tree.all().forEach(function (label) {
        _this._labelHasChangedState(label, forceUpdate, forceState);
      });
    }

    /**
     * @name _labelHasChangedState
     * @summary Sets the class for a particular label
     * @param {string} label the label to update
     * @param {boolean} forceUpdate if true, adds the label to lazy render queue
     * @param {string} forceState the class of which to change the label to
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_labelHasChangedState",
    value: function _labelHasChangedState(label, forceUpdate, forceState) {
      var state = forceState || label.state;
      if (state === "show") this.showLabel(label);
      if (state === "hide") this.hideLabel(label);
    }

    /**
     * @name _setupLabelStates
     * @summary Clears current tree and readds all stations
     * @returns {undefined}
     * @private
     */

  }, {
    key: "setupLabelStates",
    value: function setupLabelStates() {
      var _this2 = this;

      if (this.allChanged) {
        this.allChanged = false;
        this.hasChanged.clear();
        this.resetTree();

        for (var id in this.allLabels) {

          var label = this.allLabels[id];

          this.ingestLabel({
            bottomLeft: [label.minX, label.minY],
            topRight: [label.maxX, label.maxY]
          }, label.id, label.weight, label.labelObject, label.name, label.isDragged);
        }
      } else if (this.hasChanged.size) {
        var changed = [].concat(_toConsumableArray(this.hasChanged));
        this.hasChanged.clear();
        changed.forEach(function (id) {

          var label = _this2.allLabels[id];

          _this2.ingestLabel({
            bottomLeft: [label.minX, label.minY],
            topRight: [label.maxX, label.maxY]
          }, label._id, label.weight, label.labelObject, label.name, label.isDragged);
        });
      }
    }
  }, {
    key: "update",
    value: function update() {

      this.allChanged = true;
      this.setupLabelStates();
      this.handleExCollisions();
      this.forceLabelStates();
    }
  }, {
    key: "handleExCollisions",
    value: function handleExCollisions() {
      var _this3 = this;

      this.tree.all().forEach(function (hidden) {
        _this3._handleExCollisions(hidden);
      });
    }

    /**
     * @name _resetTree
     * @summary Clears current tree and redraws projection overlay
     * @returns {undefined}
     * @private
     */

  }, {
    key: "resetTree",
    value: function resetTree() {
      this.tree.clear();
    }

    /**
     * @name _makeLabel
     * @param {object} boundingBox
     * @param {string} id
     * @param {number} weight
     * @param {string} labelName
     * @param {boolean} isDragged
     * @summary Creates a standard label object with a default state
     * @returns {object}
     * @private
     */

  }, {
    key: "_makeLabel",
    value: function _makeLabel(boundingBox, id, weight, labelObject, labelName, isDragged) {
      return {
        minX: boundingBox.bottomLeft[0],
        minY: boundingBox.bottomLeft[1],
        maxX: boundingBox.topRight[0],
        maxY: boundingBox.topRight[1],
        state: "hide",
        id: id,
        weight: weight || 1,
        labelObject: labelObject,
        labelName: labelName,
        isDragged: isDragged
      };
    }

    /**
     * @name _removeFromTree
     * @param {object} label
     * @param {boolean} forceUpdate if true, triggers all labels to be updated
     * @summary Removes label from tree
     * @returns {undefined}
     * @private
     */

  }, {
    key: "removeFromTree",
    value: function removeFromTree(label, forceUpdate) {
      var id = label.id || label;
      var removelLabel = this.allLabels[id];
      this.tree.remove(removelLabel);
      delete this.allLabels[id];
      if (forceUpdate) this.forceLabelStates(true);
    }

    /**
     * @name _addToTree
     * @param {object} label
     * @summary inserts label into tree
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_addToTree",
    value: function _addToTree(label) {
      this.allLabels[label.id] = label;
      this.tree.insert(label);
    }

    /**
     * @name _handleCollisions
     * @param {array} collisions array of labels that have unresolved collisions
     * @param {object} label label to handle collisions for
     * @param {boolean} isDragged if label is currently being dragged
     * @summary Weighted collisions resolution for labels
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_handleCollisions",
    value: function _handleCollisions(collisions, label, isDragged) {
      var originalWeight = void 0;
      if (label.isDragged) label.weight = Infinity;
      var highest = label;

      collisions.forEach(function (collision) {
        var notItself = collision.id !== label.id;

        if (notItself) {

          if (collision.isDragged) {
            originalWeight = collision.weight;
            highest = collision;
            highest.weight = Infinity;
          }

          if (collision.weight > highest.weight) {
            highest.state = "hide";
            highest = collision;
          } else {
            collision.state = "hide";
          }
        }
      });

      highest.state = "show";
      if (originalWeight) highest.weight = originalWeight;
    }
  }, {
    key: "_throttle",
    value: function _throttle(callback, limit) {
      var wait = false; // Initially, we're not waiting
      return function () {
        // We return a throttled function
        if (!wait) {
          // If we're not waiting
          callback.call(); // Execute users function
          wait = true; // Prevent future invocations
          setTimeout(function () {
            // After a period of time
            wait = false; // And allow future invocations
          }, limit);
        }
      };
    }

    /**
     * @name _throttledHandleCollisions
     * @param {array} collisions array of labels that have unresolved collisions
     * @param {object} label label to handle collisions for
     * @param {boolean} isDragged if label is currently being dragged
     * @param {number} throttle interval to throttle calls by
     * @summary Ensures handleCollisions cannot be called more than once per throttle time
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_throttledHandleCollisions",
    value: function _throttledHandleCollisions(collisions, label, isDragged, throttle) {
      return this._throttle(function () {
        this._handleCollisions(collisions, label, isDragged);
      }.bind(this), throttle)();
    }

    /**
     * @name _handleExCollisions
     * @param {object} hidden hidden label
     * @summary Checks to see if a previously hidden/collided label is now able to be shown and then shows
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_handleExCollisions",
    value: function _handleExCollisions(hidden) {

      if (hidden.state === "hide") {
        var stillCollides = false;
        var hiddenLabels = this.tree.search(hidden);
        for (var i = 0; i < hiddenLabels.length; i++) {
          if (hiddenLabels[i].state !== "hide") {
            stillCollides = true;
            break;
          }
        }
        if (!stillCollides) {
          hidden.state = "show";
        }
      }
    }

    /**
     * @name _throttledHandleExCollisions
     * @param {number} throttle interval to throttle calls by
     * @summary Calls handleExCollisions on every tree label, no often than the throttle time
     * @returns {undefined}
     * @private
     */

  }, {
    key: "_throttledHandleExCollisions",
    value: function _throttledHandleExCollisions(throttle) {
      return this._throttle(function () {
        var _this4 = this;

        this.tree.all().forEach(function (hidden) {
          _this4._handleExCollisions(hidden);
        });
      }.bind(this), throttle)();
    }

    /**
     * @name _ingestLabel
     * @param {object} boundingBox
     * @param {string} id
     * @param {number} weight
     * @param {object} gmLabel
     * @param {string} labelName
     * @param {boolean} isDragged
     * @summary Creates a label if it does not already exsist, then adds it to the tree, and renders it based on whether it can be shown
     * @returns {object}
     * @private
     */

  }, {
    key: "ingestLabel",
    value: function ingestLabel(boundingBox, id, weight, labelObject, labelName, isDragged) {
      var label = this._makeLabel(boundingBox, id, weight, labelObject, labelName, isDragged);
      var newLabel = !this.allLabels[id];
      if (!newLabel) this.removeFromTree(label);
      this._addToTree(label);
      var collisions = this.tree.search(label);
      if (!collisions.length || isDragged) {
        label.state = "show";
        return;
      }

      this._handleCollisions(collisions, label, isDragged);
    }
  }, {
    key: "labelHasChanged",
    value: function labelHasChanged(id) {
      this.hasChanged.add(id);
    }
  }]);

  return labelgun;
}();

exports.default = labelgun;

/***/ }
/******/ ]);
});