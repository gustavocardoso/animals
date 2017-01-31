(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _app = require('./modules/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var myApp = (0, _app2.default)('Pet Sounds');
})();

},{"./modules/app":3}],2:[function(require,module,exports){
'use strict';

module.exports = [{ name: 'Cat', image: 'cat.svg' }, { name: 'Cow', image: 'cow.svg' }, { name: 'Dog', image: 'dog.svg' }, { name: 'Dolphin', image: 'dolphin.svg' }, { name: 'Dove', image: 'dove.svg' }, { name: 'Duck', image: 'duck.svg' }, { name: 'Elephant', image: 'elephant.svg' }, { name: 'Frog', image: 'frog.svg' }, { name: 'Hen', image: 'hen.svg' }, { name: 'Horse', image: 'horse.svg' }, { name: 'Lion', image: 'lion.svg' }, { name: 'Macaw', image: 'macaw.svg' }, { name: 'Monkey', image: 'monkey.svg' }, { name: 'Mouse', image: 'mouse.svg' }, { name: 'Owl', image: 'owl.svg' }, { name: 'Pig', image: 'pig.svg' }, { name: 'Snake', image: 'snake.svg' }, { name: 'Whale', image: 'whale.svg' }];

},{}],3:[function(require,module,exports){
'use strict';

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _animals = require('./animals');

var _animals2 = _interopRequireDefault(_animals);

var _zoo = require('./zoo');

var _zoo2 = _interopRequireDefault(_zoo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function (reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

var screen = new _screen2.default();
var animals = _animals2.default;
var zoo = new _zoo2.default(animals);

function BuildApp(name) {
  this.name = name;
  this.started = false;
  this.thumbPath = 'assets/images/animals';

  this.app = document.querySelector('.animal');
  this.animalName = document.querySelector('.animal .name');
  this.instructions = document.querySelector('.animal .instructions');
  this.thumbBox = document.querySelector('.thumb-box');
  this.btnStart = document.querySelector('.start-app');
  this.btnShuffle = document.querySelector('.shuffle');

  var obj = this;
  this.init(obj);
}

BuildApp.prototype = {
  init: function init(obj) {

    screen.init();

    obj.eManage = obj.manageInitialEvents.bind(undefined, obj);

    window.addEventListener('keyup', obj.eManage, false);

    obj.btnStart.addEventListener('click', function () {
      if (!obj.started) {
        obj.start(obj);
      }
    });
  },

  manageInitialEvents: function manageInitialEvents(obj) {
    if (event.keyCode == 32) {
      if (!obj.started) {
        obj.start(obj);
      }
    }
  },

  start: function start(obj) {
    screen.start();
    obj.started = true;

    window.removeEventListener('keyup', obj.eManage, false);

    obj.btnShuffle.addEventListener('click', function () {
      obj.shuffle(obj);
    });

    window.addEventListener('keyup', function (event) {
      if (event.keyCode == 32) {} else if (event.keyCode == 83) {
        obj.shuffle(obj);
      }
    }, false);
  },

  shuffle: function shuffle(obj) {
    var animations = ['shuffle', 'shuffle-alt'];
    var randomAnimation = Math.floor(Math.random() * animations.length);

    if (document.querySelector('.animal .instructions') != null) {
      obj.thumbBox.removeChild(obj.instructions);
    }

    var thumb = document.querySelector('.animal .animal-thumb');

    if (thumb != null) {
      obj.thumbBox.removeChild(thumb);
    }

    obj.thumbBox.classList.add(animations[randomAnimation]);
    obj.animalName.classList.add('fade');

    var animal = zoo.getRandomAnimal();

    obj.thumbBox.addEventListener("animationend", function () {
      obj.thumbBox.classList.remove(animations[randomAnimation]);
      obj.animalName.classList.remove('fade');
      obj.createAnimal(obj, animal);
    }, false);
  },

  createAnimal: function createAnimal(obj, animal) {
    var thumb = document.createElement('img');

    if (obj.thumbBox.querySelector('.animal-thumb') != null) {
      var oldThumb = obj.thumbBox.querySelector('.animal-thumb');
      obj.thumbBox.removeChild(oldThumb);
    }

    thumb.setAttribute('src', obj.thumbPath + '/' + animal.image);
    thumb.setAttribute('alt', animal.name);
    thumb.setAttribute('class', 'animal-thumb');
    obj.thumbBox.appendChild(thumb);
    obj.animalName.innerHTML = animal.name;
  }
};

function App(name) {
  return new BuildApp(name);
}

module.exports = App;

},{"./animals":2,"./screen":4,"./zoo":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen() {
    _classCallCheck(this, Screen);

    this.startScreen = 'intro';
  }

  _createClass(Screen, [{
    key: 'init',
    value: function init() {
      this.setCurrentScreen(this.startScreen);
      document.querySelector('.' + this.startScreen).classList.add('active');
    }
  }, {
    key: 'start',
    value: function start() {
      this.hideScreen(this.getCurrentScreen());
      this.setCurrentScreen('app');
      this.showCurrentScreen();
    }
  }, {
    key: 'setCurrentScreen',
    value: function setCurrentScreen(screen) {
      this.currentScreen = screen;
    }
  }, {
    key: 'getCurrentScreen',
    value: function getCurrentScreen() {
      return this.currentScreen;
    }
  }, {
    key: 'showCurrentScreen',
    value: function showCurrentScreen() {
      var screen = this.getCurrentScreen();
      document.querySelector('.' + screen).classList.add('active');
      this.setCurrentScreen(screen);
    }
  }, {
    key: 'hideScreen',
    value: function hideScreen(screen) {
      var current = screen;
      document.querySelector('.' + current).classList.remove('active');
    }
  }]);

  return Screen;
}();

exports.default = Screen;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Zoo = function () {
  function Zoo(animals) {
    _classCallCheck(this, Zoo);

    this.animals = animals || [];
  }

  _createClass(Zoo, [{
    key: "getRandomAnimal",
    value: function getRandomAnimal() {
      var randomKey = Math.floor(Math.random() * this.animals.length);
      return this.animals[randomKey];
    }
  }]);

  return Zoo;
}();

exports.default = Zoo;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc3JjL2FwcGxpY2F0aW9uLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL2FuaW1hbHMuanMiLCJhc3NldHMvanMvc3JjL21vZHVsZXMvYXBwLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL3NjcmVlbi5qcyIsImFzc2V0cy9qcy9zcmMvbW9kdWxlcy96b28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxDQUFDLFlBQU07QUFDTCxNQUFJLFFBQVEsbUJBQUksWUFBSixDQUFaO0FBQ0QsQ0FGRDs7Ozs7QUNGQSxPQUFPLE9BQVAsR0FBaUIsQ0FDZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFEZSxFQUVmLEVBQUUsTUFBTSxLQUFSLEVBQWUsT0FBTyxTQUF0QixFQUZlLEVBR2YsRUFBRSxNQUFNLEtBQVIsRUFBZSxPQUFPLFNBQXRCLEVBSGUsRUFJZixFQUFFLE1BQU0sU0FBUixFQUFtQixPQUFPLGFBQTFCLEVBSmUsRUFLZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTGUsRUFNZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTmUsRUFPZixFQUFFLE1BQU0sVUFBUixFQUFvQixPQUFPLGNBQTNCLEVBUGUsRUFRZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBUmUsRUFTZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFUZSxFQVVmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFWZSxFQVdmLEVBQUUsTUFBTSxNQUFSLEVBQWdCLE9BQU8sVUFBdkIsRUFYZSxFQVlmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFaZSxFQWFmLEVBQUUsTUFBTSxRQUFSLEVBQWtCLE9BQU8sWUFBekIsRUFiZSxFQWNmLEVBQUUs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LGdCQUFMLEVBQWI7QUFDQSxlQUFTLGFBQVQsQ0FBdUIsTUFBTSxNQUE3QixFQUFxQyxTQUFyQyxDQUErQyxHQUEvQyxDQUFtRCxRQUFuRDtBQUNBLFdBQUssZ0JBQUwsQ0FBc0IsTUFBdEI7QUFDRDs7OytCQUVVLE0sRUFBUTtBQUNqQixVQUFJLFVBQVUsTUFBZDtBQUNBLGVBQVMsYUFBVCxDQUF1QixNQUFNLE9BQTdCLEVBQXNDLFNBQXRDLENBQWdELE1BQWhELENBQXVELFFBQXZEO0FBQ0Q7Ozs7OztrQkFsQ2tCLE07Ozs7Ozs7Ozs7Ozs7SUNBQSxHO0FBQ25CLGVBQVksT0FBWixFQUFxQjtBQUFBOztBQUNuQixTQUFLLE9BQUwsR0FBZSxXQUFXLEVBQTFCO0FBQ0Q7Ozs7c0NBRWlCO0FBQ2hCLFVBQUksWUFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxPQUFMLENBQWEsTUFBeEMsQ0FBaEI7QUFDQSxhQUFPLEtBQUssT0FBTCxDQUFhLFNBQWIsQ0FBUDtBQUNEOzs7Ozs7a0JBUmtCLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcCBmcm9tICcuL21vZHVsZXMvYXBwJ1xuXG4oKCkgPT4ge1xuICBsZXQgbXlBcHAgPSBBcHAoJ1BldCBTb3VuZHMnKVxufSkoKSIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7IG5hbWU6ICdDYXQnLCBpbWFnZTogJ2NhdC5zdmcnIH0sXG4gIHsgbmFtZTogJ0NvdycsIGltYWdlOiAnY293LnN2ZycgfSxcbiAgeyBuYW1lOiAnRG9nJywgaW1hZ2U6ICdkb2cuc3ZnJyB9LFxuICB7IG5hbWU6ICdEb2xwaGluJywgaW1hZ2U6ICdkb2xwaGluLnN2ZycgfSxcbiAgeyBuYW1lOiAnRG92ZScsIGltYWdlOiAnZG92ZS5zdmcnIH0sXG4gIHsgbmFtZTogJ0R1Y2snLCBpbWFnZTogJ2R1Y2suc3ZnJyB9LFxuICB7IG5hbWU6ICdFbGVwaGFudCcsIGltYWdlOiAnZWxlcGhhbnQuc3ZnJyB9LFxuICB7IG5hbWU6ICdGcm9nJywgaW1hZ2U6ICdmcm9nLnN2ZycgfSxcbiAgeyBuYW1lOiAnSGVuJywgaW1hZ2U6ICdoZW4uc3ZnJyB9LFxuICB7IG5hbWU6ICdIb3JzZScsIGltYWdlOiAnaG9yc2Uuc3ZnJyB9LFxuICB7IG5hbWU6ICdMaW9uJywgaW1hZ2U6ICdsaW9uLnN2ZycgfSxcbiAgeyBuYW1lOiAnTWFjYXcnLCBpbWFnZTogJ21hY2F3LnN2ZycgfSxcbiAgeyBuYW1lOiAnTW9ua2V5JywgaW1hZ2U6ICdtb25rZXkuc3ZnJyB9LFxuICB7IG5hbWU6ICdNb3VzZScsIGltYWdlOiAnbW91c2Uuc3ZnJyB9LFxuICB7IG5hbWU6ICdPd2wnLCBpbWFnZTogJ293bC5zdmcnIH0sXG4gIHsgbmFtZTogJ1BpZycsIGltYWdlOiAncGlnLnN2ZycgfSxcbiAgeyBuYW1lOiAnU25ha2UnLCBpbWFnZTogJ3NuYWtlLnN2ZycgfSxcbiAgeyBuYW1lOiAnV2hhbGUnLCBpbWFnZTogJ3doYWxlLnN2ZycgfVxuXSIsImlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzdy5qcycpXG4gIC50aGVuKGZ1bmN0aW9uKHJlZykge1xuICAgIC8vIHJlZ2lzdHJhdGlvbiB3b3JrZWRcbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIHN1Y2NlZWRlZC4gU2NvcGUgaXMgJyArIHJlZy5zY29wZSk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZFxuICAgIGNvbnNvbGUubG9nKCdSZWdpc3RyYXRpb24gZmFpbGVkIHdpdGggJyArIGVycm9yKTtcbiAgfSk7XG59XG5cbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyZWVuXCJcbmltcG9ydCBBbmltYWxzIGZyb20gXCIuL2FuaW1hbHNcIlxuaW1wb3J0IFpvbyBmcm9tIFwiLi96b29cIlxuXG5sZXQgc2NyZWVuID0gbmV3IFNjcmVlblxuY29uc3QgYW5pbWFscyA9IEFuaW1hbHNcbmNvbnN0IHpvbyA9IG5ldyBab28oYW5pbWFscylcblxuZnVuY3Rpb24gQnVpbGRBcHAobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZVxuICB0aGlzLnRodW1iUGF0aCA9ICdhc3NldHMvaW1hZ2VzL2FuaW1hbHMnXG5cbiAgdGhpcy5hcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsJylcbiAgdGhpcy5hbmltYWxOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbCAubmFtZScpXG4gIHRoaXMuaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbCAuaW5zdHJ1Y3Rpb25zJylcbiAgdGhpcy50aHVtYkJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aHVtYi1ib3gnKVxuICB0aGlzLmJ0blN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWFwcCcpXG4gIHRoaXMuYnRuU2h1ZmZsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaHVmZmxlJylcblxuICBjb25zdCBvYmogPSB0aGlzXG4gIHRoaXMuaW5pdChvYmopXG59XG5cbkJ1aWxkQXBwLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogKG9iaikgPT4ge1xuXG4gICAgc2NyZWVuLmluaXQoKVxuXG4gICAgb2JqLmVNYW5hZ2UgPSBvYmoubWFuYWdlSW5pdGlhbEV2ZW50cy5iaW5kKHRoaXMsIG9iailcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9iai5lTWFuYWdlLCBmYWxzZSlcblxuICAgIG9iai5idG5TdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghb2JqLnN0YXJ0ZWQpIHtcbiAgICAgICAgb2JqLnN0YXJ0KG9iailcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIG1hbmFnZUluaXRpYWxFdmVudHM6IChvYmopID0+IHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAzMikge1xuICAgICAgaWYgKCFvYmouc3RhcnRlZCkge1xuICAgICAgICBvYmouc3RhcnQob2JqKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdGFydDogKG9iaikgPT4ge1xuICAgIHNjcmVlbi5zdGFydCgpXG4gICAgb2JqLnN0YXJ0ZWQgPSB0cnVlXG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvYmouZU1hbmFnZSwgZmFsc2UpXG5cbiAgICBvYmouYnRuU2h1ZmZsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG9iai5zaHVmZmxlKG9iailcbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDMyKSB7XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDgzKSB7XG4gICAgICAgIG9iai5zaHVmZmxlKG9iailcbiAgICAgIH1cbiAgICB9LCBmYWxzZSlcbiAgfSxcblxuICBzaHVmZmxlOiAob2JqKSA9PiB7XG4gICAgbGV0IGFuaW1hdGlvbnMgPSBbJ3NodWZmbGUnLCAnc2h1ZmZsZS1hbHQnXVxuICAgIGxldCByYW5kb21BbmltYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbmltYXRpb25zLmxlbmd0aClcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsIC5pbnN0cnVjdGlvbnMnKSAhPSBudWxsKSB7XG4gICAgICBvYmoudGh1bWJCb3gucmVtb3ZlQ2hpbGQob2JqLmluc3RydWN0aW9ucylcbiAgICB9XG5cbiAgICBsZXQgdGh1bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsIC5hbmltYWwtdGh1bWInKVxuXG4gICAgaWYgKHRodW1iICE9IG51bGwpIHtcbiAgICAgIG9iai50aHVtYkJveC5yZW1vdmVDaGlsZCh0aHVtYilcbiAgICB9XG5cbiAgICBvYmoudGh1bWJCb3guY2xhc3NMaXN0LmFkZChhbmltYXRpb25zW3JhbmRvbUFuaW1hdGlvbl0pXG4gICAgb2JqLmFuaW1hbE5hbWUuY2xhc3NMaXN0LmFkZCgnZmFkZScpXG5cbiAgICBsZXQgYW5pbWFsID0gem9vLmdldFJhbmRvbUFuaW1hbCgpXG5cbiAgICBvYmoudGh1bWJCb3guYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG4gICAgICBvYmoudGh1bWJCb3guY2xhc3NMaXN0LnJlbW92ZShhbmltYXRpb25zW3JhbmRvbUFuaW1hdGlvbl0pXG4gICAgICBvYmouYW5pbWFsTmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlJylcbiAgICAgIG9iai5jcmVhdGVBbmltYWwob2JqLCBhbmltYWwpXG4gICAgfSwgZmFsc2UpO1xuICB9LFxuXG4gIGNyZWF0ZUFuaW1hbDogKG9iaiwgYW5pbWFsKSA9PiB7XG4gICAgbGV0IHRodW1iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgIGlmIChvYmoudGh1bWJCb3gucXVlcnlTZWxlY3RvcignLmFuaW1hbC10aHVtYicpICE9IG51bGwpIHtcbiAgICAgIGxldCBvbGRUaHVtYiA9IG9iai50aHVtYkJveC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsLXRodW1iJylcbiAgICAgIG9iai50aHVtYkJveC5yZW1vdmVDaGlsZChvbGRUaHVtYilcbiAgICB9XG4gICAgXG4gICAgdGh1bWIuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmoudGh1bWJQYXRoICsgJy8nICsgYW5pbWFsLmltYWdlKVxuICAgIHRodW1iLnNldEF0dHJpYnV0ZSgnYWx0JywgYW5pbWFsLm5hbWUpXG4gICAgdGh1bWIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbmltYWwtdGh1bWInKVxuICAgIG9iai50aHVtYkJveC5hcHBlbmRDaGlsZCh0aHVtYilcbiAgICBvYmouYW5pbWFsTmFtZS5pbm5lckhUTUwgPSBhbmltYWwubmFtZVxuICB9XG59XG5cbmZ1bmN0aW9uIEFwcChuYW1lKSB7XG4gIHJldHVybiBuZXcgQnVpbGRBcHAobmFtZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXJ0U2NyZWVuID0gJ2ludHJvJ1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldEN1cnJlbnRTY3JlZW4odGhpcy5zdGFydFNjcmVlbilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuc3RhcnRTY3JlZW4pLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmhpZGVTY3JlZW4odGhpcy5nZXRDdXJyZW50U2NyZWVuKCkpXG4gICAgdGhpcy5zZXRDdXJyZW50U2NyZWVuKCdhcHAnKVxuICAgIHRoaXMuc2hvd0N1cnJlbnRTY3JlZW4oKVxuICB9XG5cbiAgc2V0Q3VycmVudFNjcmVlbihzY3JlZW4pIHtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBzY3JlZW5cbiAgfVxuXG4gIGdldEN1cnJlbnRTY3JlZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNjcmVlblxuICB9XG5cbiAgc2hvd0N1cnJlbnRTY3JlZW4oKSB7XG4gICAgbGV0IHNjcmVlbiA9IHRoaXMuZ2V0Q3VycmVudFNjcmVlbigpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBzY3JlZW4pLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgdGhpcy5zZXRDdXJyZW50U2NyZWVuKHNjcmVlbilcbiAgfVxuXG4gIGhpZGVTY3JlZW4oc2NyZWVuKSB7XG4gICAgbGV0IGN1cnJlbnQgPSBzY3JlZW5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGN1cnJlbnQpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9vIHtcbiAgY29uc3RydWN0b3IoYW5pbWFscykge1xuICAgIHRoaXMuYW5pbWFscyA9IGFuaW1hbHMgfHwgW11cbiAgfVxuXG4gIGdldFJhbmRvbUFuaW1hbCgpIHtcbiAgICBsZXQgcmFuZG9tS2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5hbmltYWxzLmxlbmd0aClcbiAgICByZXR1cm4gdGhpcy5hbmltYWxzW3JhbmRvbUtleV1cbiAgfVxufSJdfQ==
