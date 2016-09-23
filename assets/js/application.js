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
"use strict";

var _screen = require("./screen");

var _screen2 = _interopRequireDefault(_screen);

var _animals = require("./animals");

var _animals2 = _interopRequireDefault(_animals);

var _zoo = require("./zoo");

var _zoo2 = _interopRequireDefault(_zoo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = new _screen2.default();
var animals = _animals2.default;
var zoo = new _zoo2.default(animals);

function BuildApp(name) {
  this.name = name;
  this.started = false;
  this.thumbPath = 'assets/images/animals';

  this.animalName = document.querySelector('.animal .name');
  this.thumbBox = document.querySelector('.thumb-box');
  this.btnShuffle = document.querySelector('.shuffle');

  var obj = this;
  this.init(obj);
}

BuildApp.prototype = {
  init: function init(obj) {

    screen.init();

    window.addEventListener('keyup', function (event) {
      if (event.keyCode == 32) {
        if (!obj.started) {
          console.log('Space button to start');
          obj.start(obj);
        } else {
          console.log('Space button to play');
        }
      }
    });
  },

  start: function start(obj) {
    screen.start();
    obj.started = true;

    obj.btnShuffle.addEventListener('click', function () {
      var animal = zoo.getRandomAnimal();
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
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc3JjL2FwcGxpY2F0aW9uLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL2FuaW1hbHMuanMiLCJhc3NldHMvanMvc3JjL21vZHVsZXMvYXBwLmpzIiwiYXNzZXRzL2pzL3NyYy9tb2R1bGVzL3NjcmVlbi5qcyIsImFzc2V0cy9qcy9zcmMvbW9kdWxlcy96b28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxDQUFDLFlBQU07QUFDTCxNQUFJLFFBQVEsbUJBQUksWUFBSixDQUFaO0FBQ0QsQ0FGRDs7Ozs7QUNGQSxPQUFPLE9BQVAsR0FBaUIsQ0FDZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFEZSxFQUVmLEVBQUUsTUFBTSxLQUFSLEVBQWUsT0FBTyxTQUF0QixFQUZlLEVBR2YsRUFBRSxNQUFNLEtBQVIsRUFBZSxPQUFPLFNBQXRCLEVBSGUsRUFJZixFQUFFLE1BQU0sU0FBUixFQUFtQixPQUFPLGFBQTFCLEVBSmUsRUFLZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTGUsRUFNZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBTmUsRUFPZixFQUFFLE1BQU0sVUFBUixFQUFvQixPQUFPLGNBQTNCLEVBUGUsRUFRZixFQUFFLE1BQU0sTUFBUixFQUFnQixPQUFPLFVBQXZCLEVBUmUsRUFTZixFQUFFLE1BQU0sS0FBUixFQUFlLE9BQU8sU0FBdEIsRUFUZSxFQVVmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFWZSxFQVdmLEVBQUUsTUFBTSxNQUFSLEVBQWdCLE9BQU8sVUFBdkIsRUFYZSxFQVlmLEVBQUUsTUFBTSxPQUFSLEVBQWlCLE9BQU8sV0FBeEIsRUFaZSxFQWFmLEVBQUUsTUFBTSxRQUFSLEVBQWtCLE9BQU8sWUFBekIsRUFiZSxFQWNmLEVBQUUs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U0FBL0MsQ0FBeUQsR0FBekQsQ0FBNkQsUUFBN0Q7QUFDRDs7OzRCQUVPO0FBQ04sV0FBSyxnQkFBTCxDQUFzQixLQUF0QjtBQUNBLFdBQUssaUJBQUw7QUFDRDs7O3FDQUVnQixNLEVBQVE7QUFDdkIsV0FBSyxhQUFMLEdBQXFCLE1BQXJCO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsYUFBTyxLQUFLLGFBQVo7QUFDRDs7O3dDQUVtQjtBQUNsQixVQUFJLFNBQVMsS0FBSyxnQkFBTCxFQUFiO0FBQ0EsV0FBSyxpQkFBTDtBQUNBLGVBQVMsYUFBVCxDQUF1QixNQUFNLE1BQTdCLEVBQXFDLFNBQXJDLENBQStDLEdBQS9DLENBQW1ELFFBQW5EO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixNQUF0QjtBQUNEOzs7d0NBRW1CO0FBQ2xCLFVBQUksVUFBVSxLQUFLLGdCQUFMLEVBQWQ7QUFDQSxlQUFTLGFBQVQsQ0FBdUIsTUFBTSxPQUE3QixFQUFzQyxTQUF0QyxDQUFnRCxNQUFoRCxDQUF1RCxRQUF2RDtBQUNEOzs7Ozs7a0JBbENrQixNOzs7Ozs7Ozs7Ozs7O0lDQUEsRztBQUNuQixlQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBSyxPQUFMLEdBQWUsV0FBVyxFQUExQjtBQUNEOzs7O3NDQUVpQjtBQUNoQixVQUFJLFlBQVksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQUssT0FBTCxDQUFhLE1BQXhDLENBQWhCO0FBQ0EsYUFBTyxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQVA7QUFDRDs7Ozs7O2tCQVJrQixHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBcHAgZnJvbSAnLi9tb2R1bGVzL2FwcCdcblxuKCgpID0+IHtcbiAgbGV0IG15QXBwID0gQXBwKCdQZXQgU291bmRzJylcbn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgeyBuYW1lOiAnQ2F0JywgaW1hZ2U6ICdjYXQuc3ZnJyB9LFxuICB7IG5hbWU6ICdDb3cnLCBpbWFnZTogJ2Nvdy5zdmcnIH0sXG4gIHsgbmFtZTogJ0RvZycsIGltYWdlOiAnZG9nLnN2ZycgfSxcbiAgeyBuYW1lOiAnRG9scGhpbicsIGltYWdlOiAnZG9scGhpbi5zdmcnIH0sXG4gIHsgbmFtZTogJ0RvdmUnLCBpbWFnZTogJ2RvdmUuc3ZnJyB9LFxuICB7IG5hbWU6ICdEdWNrJywgaW1hZ2U6ICdkdWNrLnN2ZycgfSxcbiAgeyBuYW1lOiAnRWxlcGhhbnQnLCBpbWFnZTogJ2VsZXBoYW50LnN2ZycgfSxcbiAgeyBuYW1lOiAnRnJvZycsIGltYWdlOiAnZnJvZy5zdmcnIH0sXG4gIHsgbmFtZTogJ0hlbicsIGltYWdlOiAnaGVuLnN2ZycgfSxcbiAgeyBuYW1lOiAnSG9yc2UnLCBpbWFnZTogJ2hvcnNlLnN2ZycgfSxcbiAgeyBuYW1lOiAnTGlvbicsIGltYWdlOiAnbGlvbi5zdmcnIH0sXG4gIHsgbmFtZTogJ01hY2F3JywgaW1hZ2U6ICdtYWNhdy5zdmcnIH0sXG4gIHsgbmFtZTogJ01vbmtleScsIGltYWdlOiAnbW9ua2V5LnN2ZycgfSxcbiAgeyBuYW1lOiAnTW91c2UnLCBpbWFnZTogJ21vdXNlLnN2ZycgfSxcbiAgeyBuYW1lOiAnT3dsJywgaW1hZ2U6ICdvd2wuc3ZnJyB9LFxuICB7IG5hbWU6ICdQaWcnLCBpbWFnZTogJ3BpZy5zdmcnIH0sXG4gIHsgbmFtZTogJ1NuYWtlJywgaW1hZ2U6ICdzbmFrZS5zdmcnIH0sXG4gIHsgbmFtZTogJ1doYWxlJywgaW1hZ2U6ICd3aGFsZS5zdmcnIH1cbl0iLCJpbXBvcnQgU2NyZWVuIGZyb20gXCIuL3NjcmVlblwiXG5pbXBvcnQgQW5pbWFscyBmcm9tIFwiLi9hbmltYWxzXCJcbmltcG9ydCBab28gZnJvbSBcIi4vem9vXCJcblxubGV0IHNjcmVlbiA9IG5ldyBTY3JlZW5cbmNvbnN0IGFuaW1hbHMgPSBBbmltYWxzXG5jb25zdCB6b28gPSBuZXcgWm9vKGFuaW1hbHMpXG5cbmZ1bmN0aW9uIEJ1aWxkQXBwKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgdGhpcy50aHVtYlBhdGggPSAnYXNzZXRzL2ltYWdlcy9hbmltYWxzJ1xuXG4gIHRoaXMuYW5pbWFsTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYWwgLm5hbWUnKVxuICB0aGlzLnRodW1iQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRodW1iLWJveCcpXG4gIHRoaXMuYnRuU2h1ZmZsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaHVmZmxlJylcblxuICBjb25zdCBvYmogPSB0aGlzXG4gIHRoaXMuaW5pdChvYmopXG59XG5cbkJ1aWxkQXBwLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogKG9iaikgPT4ge1xuXG4gICAgc2NyZWVuLmluaXQoKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDMyKSB7XG4gICAgICAgIGlmICghb2JqLnN0YXJ0ZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnU3BhY2UgYnV0dG9uIHRvIHN0YXJ0JylcbiAgICAgICAgICBvYmouc3RhcnQob2JqKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdTcGFjZSBidXR0b24gdG8gcGxheScpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHN0YXJ0OiAob2JqKSA9PiB7XG4gICAgc2NyZWVuLnN0YXJ0KClcbiAgICBvYmouc3RhcnRlZCA9IHRydWVcblxuICAgIG9iai5idG5TaHVmZmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IGFuaW1hbCA9IHpvby5nZXRSYW5kb21BbmltYWwoKVxuICAgICAgbGV0IHRodW1iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgICAgaWYgKG9iai50aHVtYkJveC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsLXRodW1iJykgIT0gbnVsbCkge1xuICAgICAgICBsZXQgb2xkVGh1bWIgPSBvYmoudGh1bWJCb3gucXVlcnlTZWxlY3RvcignLmFuaW1hbC10aHVtYicpXG4gICAgICAgIG9iai50aHVtYkJveC5yZW1vdmVDaGlsZChvbGRUaHVtYilcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGh1bWIuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmoudGh1bWJQYXRoICsgJy8nICsgYW5pbWFsLmltYWdlKVxuICAgICAgdGh1bWIuc2V0QXR0cmlidXRlKCdhbHQnLCBhbmltYWwubmFtZSlcbiAgICAgIHRodW1iLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYW5pbWFsLXRodW1iJylcbiAgICAgIG9iai50aHVtYkJveC5hcHBlbmRDaGlsZCh0aHVtYilcbiAgICAgIG9iai5hbmltYWxOYW1lLmlubmVySFRNTCA9IGFuaW1hbC5uYW1lXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBBcHAobmFtZSkge1xuICByZXR1cm4gbmV3IEJ1aWxkQXBwKG5hbWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhcnRTY3JlZW4gPSAnaW50cm8nXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbih0aGlzLnN0YXJ0U2NyZWVuKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5zdGFydFNjcmVlbikuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbignYXBwJylcbiAgICB0aGlzLnNob3dDdXJyZW50U2NyZWVuKClcbiAgfVxuXG4gIHNldEN1cnJlbnRTY3JlZW4oc2NyZWVuKSB7XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gc2NyZWVuXG4gIH1cblxuICBnZXRDdXJyZW50U2NyZWVuKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY3JlZW5cbiAgfVxuXG4gIHNob3dDdXJyZW50U2NyZWVuKCkge1xuICAgIGxldCBzY3JlZW4gPSB0aGlzLmdldEN1cnJlbnRTY3JlZW4oKVxuICAgIHRoaXMuaGlkZUN1cnJlbnRTY3JlZW4oKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2NyZWVuKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIHRoaXMuc2V0Q3VycmVudFNjcmVlbihzY3JlZW4pXG4gIH1cblxuICBoaWRlQ3VycmVudFNjcmVlbigpIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0Q3VycmVudFNjcmVlbigpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBjdXJyZW50KS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBab28ge1xuICBjb25zdHJ1Y3RvcihhbmltYWxzKSB7XG4gICAgdGhpcy5hbmltYWxzID0gYW5pbWFscyB8fCBbXVxuICB9XG5cbiAgZ2V0UmFuZG9tQW5pbWFsKCkge1xuICAgIGxldCByYW5kb21LZXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFuaW1hbHMubGVuZ3RoKVxuICAgIHJldHVybiB0aGlzLmFuaW1hbHNbcmFuZG9tS2V5XVxuICB9XG59Il19
