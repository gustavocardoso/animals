// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//   .then(function(reg) {
//     // registration worked
//     console.log('Registration succeeded. Scope is ' + reg.scope);
//   }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
//   });
// }

import Screen from "./screen"
import Animals from "./animals"
import Zoo from "./zoo"

let screen = new Screen
const animals = Animals
const zoo = new Zoo(animals)

function BuildApp(name) {
  this.name = name;
  this.started = false
  this.thumbPath = '/images/animals'

  this.app = document.querySelector('.animal')
  this.animalName = document.querySelector('.animal .name')
  this.instructions = document.querySelector('.animal .instructions')
  this.thumbBox = document.querySelector('.thumb-box')
  this.btnStart = document.querySelector('.start-app')
  this.btnShuffle = document.querySelector('.shuffle')

  const obj = this
  this.init(obj)
}

BuildApp.prototype = {
  init: (obj) => {

    screen.init()

    obj.eManage = obj.manageInitialEvents.bind(this, obj)

    window.addEventListener('keyup', obj.eManage, false)

    obj.btnStart.addEventListener('click', () => {
      if (!obj.started) {
        obj.start(obj)
      }
    })
  },

  manageInitialEvents: (obj) => {
    if (event.keyCode == 32) {
      if (!obj.started) {
        obj.start(obj)
      }
    }
  },

  start: (obj) => {
    screen.start()
    obj.started = true

    window.removeEventListener('keyup', obj.eManage, false)

    obj.btnShuffle.addEventListener('click', () => {
      obj.shuffle(obj)
    })

    window.addEventListener('keyup', function(event) {
      if (event.keyCode == 32) {
        
      } else if (event.keyCode == 83) {
        obj.shuffle(obj)
      }
    }, false)
  },

  shuffle: (obj) => {
    let animations = ['shuffle', 'shuffle-alt']
    let randomAnimation = Math.floor(Math.random() * animations.length)

    if (document.querySelector('.animal .instructions') != null) {
      obj.thumbBox.removeChild(obj.instructions)
    }

    let thumb = document.querySelector('.animal .animal-thumb')

    if (thumb != null) {
      obj.thumbBox.removeChild(thumb)
    }

    obj.thumbBox.classList.add(animations[randomAnimation])
    obj.animalName.classList.add('fade')

    let animal = zoo.getRandomAnimal()

    obj.thumbBox.addEventListener("animationend", () => {
      obj.thumbBox.classList.remove(animations[randomAnimation])
      obj.animalName.classList.remove('fade')
      obj.createAnimal(obj, animal)
    }, false);
  },

  createAnimal: (obj, animal) => {
    let thumb = document.createElement('img')

    if (obj.thumbBox.querySelector('.animal-thumb') != null) {
      let oldThumb = obj.thumbBox.querySelector('.animal-thumb')
      obj.thumbBox.removeChild(oldThumb)
    }
    
    thumb.setAttribute('src', obj.thumbPath + '/' + animal.image)
    thumb.setAttribute('alt', animal.name)
    thumb.setAttribute('class', 'animal-thumb')
    obj.thumbBox.appendChild(thumb)
    obj.animalName.innerHTML = animal.name
  }
}

function App(name) {
  return new BuildApp(name);
}

module.exports = App;
