(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WeAppRedux"] = factory();
	else
		root["WeAppRedux"] = factory();
})(this, function() {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Provider = __webpack_require__(2);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(3);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Provider: _Provider2.default,
	  connect: _connect2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

	module.exports = warning;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _warning = __webpack_require__(1);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function checkStoreShape(store) {
	  var missingMethods = ['subscribe', 'dispatch', 'getState'].filter(function (m) {
	    return !store.hasOwnProperty(m);
	  });

	  if (missingMethods.length > 0) {
	    (0, _warning2.default)('Store似乎不是一个合法的Redux Store对象: ' + '缺少这些方法: ' + missingMethods.join(', ') + '。');
	  }
	}

	function Provider(store) {
	  checkStoreShape(store);
	  return function (App) {
	    App.prototype.store = store;
	    return App;
	  };
	}

	module.exports = Provider;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _shallowEqual = __webpack_require__(4);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _warning = __webpack_require__(1);

	var _warning2 = _interopRequireDefault(_warning);

	var _wrapActionCreators = __webpack_require__(5);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};

	function connect(mapStateToProps, mapDispatchToProps) {
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	  var app = getApp();

	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2.default)(mapDispatchToProps);
	  }

	  return function wrapWithConnect(pageComponent) {

	    function handleChange(options) {
	      if (!this.unsubscribe) {
	        return;
	      }

	      var state = this.store.getState();
	      var mappedState = mapState(state, options);
	      if (!this.data || (0, _shallowEqual2.default)(this.data, mappedState)) {
	        return;
	      }
	      this.setData(mappedState);
	    }

	    function onLoad(options) {
	      this.store = app.store;
	      if (!this.store) {
	        (0, _warning2.default)("Store对象不存在!");
	      }
	      if (shouldSubscribe) {
	        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
	        handleChange.apply(this);
	      }
	      // pageComponent.prototype.onLoad.call(options)
	    }

	    function onUnload() {
	      typeof this.unsubscribe === 'function' && this.unsubscribe();
	    }

	    function injectMethod(fun, options) {
	      return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        options.before && options.before.apply(this, args);
	        var result = fun && fun.apply(this, args);
	        options.after && options.after.apply(this, args);
	        return result;
	      };
	    }

	    pageComponent.prototype.onLoad = injectMethod(pageComponent.prototype.onLoad, {
	      before: function before(args) {
	        onLoad.apply(this, args);
	      }
	    });
	    pageComponent.prototype.onUnload = injectMethod(pageComponent.prototype.onUnload, {
	      before: function before(args) {
	        onUnload.apply(this, args);
	      }
	    });

	    return pageComponent;
	  };
	}

	module.exports = connect;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return bindActionCreators(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ }
/******/ ])
});
;