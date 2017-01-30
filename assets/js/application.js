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
      this.hideCurrentScreen();
      document.querySelector('.' + screen).classList.add('active');
      this.setCurrentScreen(screen);
    }
  }, {
    key: 'hideCurrentScreen',
    value: function hideCurrentScreen() {
      var current = this.getCurrentScreen();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc3JjL2FwcGxpY2F0aW9uLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL2FuaW1hbHMuanMiLCJhc3NldHMvanMvc3JjL21vZHVsZXMvYXBwLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL3NjcmVlbi5qcyIsImFzc2V0cy9qcy9zcmMvbW9kdWxlcy96b28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxDQUFDLFlBQU07QUFDTCxNQUFJLFFBQVEsbUJBQUksWUFBSixDQUFaO0FBQ0QsQ0FGRDs7Ozs7QUNGQSxPQUFPLE9BQVAsR0FBaUIsQ0FDZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFEZSxFQUVmLEVBQUUsTUFBTSxLQUFSLEVBQWUsT0FBTyxTQUF0QixFQUZlLEVBR2YsRUFBRSxNQUFNLEtBQVIsRUFBZSxPQUFPLFNBQXRCLEVBSGUsRUFJZixFQUFFLE1BQU0sU0FBUixFQUFtQixPQUFPLGFBQTFCLEVBSmUsRUFLZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTGUsRUFNZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTmUsRUFPZixFQUFFLE1BQU0sVUFBUixFQUFvQixPQUFPLGNBQTNCLEVBUGUsRUFRZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBUmUsRUFTZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFUZSxFQVVmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFWZSxFQVdmLEVBQUUsTUFBTSxNQUFSLEVBQWdCLE9BQU8sVUFBdkIsRUFYZSxFQVlmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFaZSxFQWFmLEVBQUUsTUFBTSxRQUFSLEVBQWtCLE9BQU8sWUFBekIsRUFiZSxFQWNmLEVBQUUs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YUFBVCxDQUF1QixNQUFNLE1BQTdCLEVBQXFDLFNBQXJDLENBQStDLEdBQS9DLENBQW1ELFFBQW5EO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixNQUF0QjtBQUNEOzs7d0NBRW1CO0FBQ2xCLFVBQUksVUFBVSxLQUFLLGdCQUFMLEVBQWQ7QUFDQSxlQUFTLGFBQVQsQ0FBdUIsTUFBTSxPQUE3QixFQUFzQyxTQUF0QyxDQUFnRCxNQUFoRCxDQUF1RCxRQUF2RDtBQUNEOzs7Ozs7a0JBbENrQixNOzs7Ozs7Ozs7Ozs7O0lDQUEsRztBQUNuQixlQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBSyxPQUFMLEdBQWUsV0FBVyxFQUExQjtBQUNEOzs7O3NDQUVpQjtBQUNoQixVQUFJLFlBQVksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQUssT0FBTCxDQUFhLE1BQXhDLENBQWhCO0FBQ0EsYUFBTyxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQVA7QUFDRDs7Ozs7O2tCQVJrQixHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBcHAgZnJvbSAnLi9tb2R1bGVzL2FwcCdcblxuKCgpID0+IHtcbiAgbGV0IG15QXBwID0gQXBwKCdQZXQgU291bmRzJylcbn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgeyBuYW1lOiAnQ2F0JywgaW1hZ2U6ICdjYXQuc3ZnJyB9LFxuICB7IG5hbWU6ICdDb3cnLCBpbWFnZTogJ2Nvdy5zdmcnIH0sXG4gIHsgbmFtZTogJ0RvZycsIGltYWdlOiAnZG9nLnN2ZycgfSxcbiAgeyBuYW1lOiAnRG9scGhpbicsIGltYWdlOiAnZG9scGhpbi5zdmcnIH0sXG4gIHsgbmFtZTogJ0RvdmUnLCBpbWFnZTogJ2RvdmUuc3ZnJyB9LFxuICB7IG5hbWU6ICdEdWNrJywgaW1hZ2U6ICdkdWNrLnN2ZycgfSxcbiAgeyBuYW1lOiAnRWxlcGhhbnQnLCBpbWFnZTogJ2VsZXBoYW50LnN2ZycgfSxcbiAgeyBuYW1lOiAnRnJvZycsIGltYWdlOiAnZnJvZy5zdmcnIH0sXG4gIHsgbmFtZTogJ0hlbicsIGltYWdlOiAnaGVuLnN2ZycgfSxcbiAgeyBuYW1lOiAnSG9yc2UnLCBpbWFnZTogJ2hvcnNlLnN2ZycgfSxcbiAgeyBuYW1lOiAnTGlvbicsIGltYWdlOiAnbGlvbi5zdmcnIH0sXG4gIHsgbmFtZTogJ01hY2F3JywgaW1hZ2U6ICdtYWNhdy5zdmcnIH0sXG4gIHsgbmFtZTogJ01vbmtleScsIGltYWdlOiAnbW9ua2V5LnN2ZycgfSxcbiAgeyBuYW1lOiAnTW91c2UnLCBpbWFnZTogJ21vdXNlLnN2ZycgfSxcbiAgeyBuYW1lOiAnT3dsJywgaW1hZ2U6ICdvd2wuc3ZnJyB9LFxuICB7IG5hbWU6ICdQaWcnLCBpbWFnZTogJ3BpZy5zdmcnIH0sXG4gIHsgbmFtZTogJ1NuYWtlJywgaW1hZ2U6ICdzbmFrZS5zdmcnIH0sXG4gIHsgbmFtZTogJ1doYWxlJywgaW1hZ2U6ICd3aGFsZS5zdmcnIH1cbl0iLCJpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc3cuanMnKVxuICAudGhlbihmdW5jdGlvbihyZWcpIHtcbiAgICAvLyByZWdpc3RyYXRpb24gd29ya2VkXG4gICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBzdWNjZWVkZWQuIFNjb3BlIGlzICcgKyByZWcuc2NvcGUpO1xuICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIHJlZ2lzdHJhdGlvbiBmYWlsZWRcbiAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIGZhaWxlZCB3aXRoICcgKyBlcnJvcik7XG4gIH0pO1xufVxuXG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL3NjcmVlblwiXG5pbXBvcnQgQW5pbWFscyBmcm9tIFwiLi9hbmltYWxzXCJcbmltcG9ydCBab28gZnJvbSBcIi4vem9vXCJcblxubGV0IHNjcmVlbiA9IG5ldyBTY3JlZW5cbmNvbnN0IGFuaW1hbHMgPSBBbmltYWxzXG5jb25zdCB6b28gPSBuZXcgWm9vKGFuaW1hbHMpXG5cbmZ1bmN0aW9uIEJ1aWxkQXBwKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgdGhpcy50aHVtYlBhdGggPSAnYXNzZXRzL2ltYWdlcy9hbmltYWxzJ1xuXG4gIHRoaXMuYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbCcpXG4gIHRoaXMuYW5pbWFsTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYWwgLm5hbWUnKVxuICB0aGlzLmluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYWwgLmluc3RydWN0aW9ucycpXG4gIHRoaXMudGh1bWJCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGh1bWItYm94JylcbiAgdGhpcy5idG5TdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1hcHAnKVxuICB0aGlzLmJ0blNodWZmbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2h1ZmZsZScpXG5cbiAgY29uc3Qgb2JqID0gdGhpc1xuICB0aGlzLmluaXQob2JqKVxufVxuXG5CdWlsZEFwcC5wcm90b3R5cGUgPSB7XG4gIGluaXQ6IChvYmopID0+IHtcblxuICAgIHNjcmVlbi5pbml0KClcblxuICAgIG9iai5lTWFuYWdlID0gb2JqLm1hbmFnZUluaXRpYWxFdmVudHMuYmluZCh0aGlzLCBvYmopXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvYmouZU1hbmFnZSwgZmFsc2UpXG5cbiAgICBvYmouYnRuU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoIW9iai5zdGFydGVkKSB7XG4gICAgICAgIG9iai5zdGFydChvYmopXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBtYW5hZ2VJbml0aWFsRXZlbnRzOiAob2JqKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzIpIHtcbiAgICAgIGlmICghb2JqLnN0YXJ0ZWQpIHtcbiAgICAgICAgb2JqLnN0YXJ0KG9iailcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc3RhcnQ6IChvYmopID0+IHtcbiAgICBzY3JlZW4uc3RhcnQoKVxuICAgIG9iai5zdGFydGVkID0gdHJ1ZVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb2JqLmVNYW5hZ2UsIGZhbHNlKVxuXG4gICAgb2JqLmJ0blNodWZmbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvYmouc2h1ZmZsZShvYmopXG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAzMikge1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PSA4Mykge1xuICAgICAgICBvYmouc2h1ZmZsZShvYmopXG4gICAgICB9XG4gICAgfSwgZmFsc2UpXG4gIH0sXG5cbiAgc2h1ZmZsZTogKG9iaikgPT4ge1xuICAgIGxldCBhbmltYXRpb25zID0gWydzaHVmZmxlJywgJ3NodWZmbGUtYWx0J11cbiAgICBsZXQgcmFuZG9tQW5pbWF0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5pbWF0aW9ucy5sZW5ndGgpXG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbCAuaW5zdHJ1Y3Rpb25zJykgIT0gbnVsbCkge1xuICAgICAgb2JqLnRodW1iQm94LnJlbW92ZUNoaWxkKG9iai5pbnN0cnVjdGlvbnMpXG4gICAgfVxuXG4gICAgbGV0IHRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbCAuYW5pbWFsLXRodW1iJylcblxuICAgIGlmICh0aHVtYiAhPSBudWxsKSB7XG4gICAgICBvYmoudGh1bWJCb3gucmVtb3ZlQ2hpbGQodGh1bWIpXG4gICAgfVxuXG4gICAgb2JqLnRodW1iQm94LmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uc1tyYW5kb21BbmltYXRpb25dKVxuICAgIG9iai5hbmltYWxOYW1lLmNsYXNzTGlzdC5hZGQoJ2ZhZGUnKVxuXG4gICAgbGV0IGFuaW1hbCA9IHpvby5nZXRSYW5kb21BbmltYWwoKVxuXG4gICAgb2JqLnRodW1iQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgKCkgPT4ge1xuICAgICAgb2JqLnRodW1iQm94LmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0aW9uc1tyYW5kb21BbmltYXRpb25dKVxuICAgICAgb2JqLmFuaW1hbE5hbWUuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZScpXG4gICAgICBvYmouY3JlYXRlQW5pbWFsKG9iaiwgYW5pbWFsKVxuICAgIH0sIGZhbHNlKTtcbiAgfSxcblxuICBjcmVhdGVBbmltYWw6IChvYmosIGFuaW1hbCkgPT4ge1xuICAgIGxldCB0aHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cbiAgICBpZiAob2JqLnRodW1iQm94LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYWwtdGh1bWInKSAhPSBudWxsKSB7XG4gICAgICBsZXQgb2xkVGh1bWIgPSBvYmoudGh1bWJCb3gucXVlcnlTZWxlY3RvcignLmFuaW1hbC10aHVtYicpXG4gICAgICBvYmoudGh1bWJCb3gucmVtb3ZlQ2hpbGQob2xkVGh1bWIpXG4gICAgfVxuICAgIFxuICAgIHRodW1iLnNldEF0dHJpYnV0ZSgnc3JjJywgb2JqLnRodW1iUGF0aCArICcvJyArIGFuaW1hbC5pbWFnZSlcbiAgICB0aHVtYi5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFuaW1hbC5uYW1lKVxuICAgIHRodW1iLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYW5pbWFsLXRodW1iJylcbiAgICBvYmoudGh1bWJCb3guYXBwZW5kQ2hpbGQodGh1bWIpXG4gICAgb2JqLmFuaW1hbE5hbWUuaW5uZXJIVE1MID0gYW5pbWFsLm5hbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBBcHAobmFtZSkge1xuICByZXR1cm4gbmV3IEJ1aWxkQXBwKG5hbWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhcnRTY3JlZW4gPSAnaW50cm8nXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbih0aGlzLnN0YXJ0U2NyZWVuKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5zdGFydFNjcmVlbikuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbignYXBwJylcbiAgICB0aGlzLnNob3dDdXJyZW50U2NyZWVuKClcbiAgfVxuXG4gIHNldEN1cnJlbnRTY3JlZW4oc2NyZWVuKSB7XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gc2NyZWVuXG4gIH1cblxuICBnZXRDdXJyZW50U2NyZWVuKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY3JlZW5cbiAgfVxuXG4gIHNob3dDdXJyZW50U2NyZWVuKCkge1xuICAgIGxldCBzY3JlZW4gPSB0aGlzLmdldEN1cnJlbnRTY3JlZW4oKVxuICAgIHRoaXMuaGlkZUN1cnJlbnRTY3JlZW4oKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2NyZWVuKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbihzY3JlZW4pXG4gIH1cblxuICBoaWRlQ3VycmVudFNjcmVlbigpIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0Q3VycmVudFNjcmVlbigpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBjdXJyZW50KS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBab28ge1xuICBjb25zdHJ1Y3RvcihhbmltYWxzKSB7XG4gICAgdGhpcy5hbmltYWxzID0gYW5pbWFscyB8fCBbXVxuICB9XG5cbiAgZ2V0UmFuZG9tQW5pbWFsKCkge1xuICAgIGxldCByYW5kb21LZXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFuaW1hbHMubGVuZ3RoKVxuICAgIHJldHVybiB0aGlzLmFuaW1hbHNbcmFuZG9tS2V5XVxuICB9XG59Il19
