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
  this.playerWord = document.querySelector('.player-word')
  this.playerSound = document.querySelector('.player-sound')

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
    }, false)
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
    }, false)

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

    if (!obj.playerWord.paused) {
      obj.playerWord.pause()
      obj.playerWord.currentTime = 0
    }

    if (document.querySelector('.animal .instructions') != null) {
      obj.thumbBox.removeChild(obj.instructions)
    }

    let thumb = document.querySelector('.animal-thumb')

    if (thumb != null) {
      obj.thumbBox.removeChild(thumb)
    }

    obj.thumbBox.classList.add(animations[randomAnimation])
    obj.animalName.classList.add('fade')

    let animal = zoo.getRandomAnimal()

    let time = setTimeout(() => {
      obj.thumbBox.addEventListener('animationend', obj.createAnimal(obj, animal, animations, randomAnimation), false);
    }, 300)
  },

  createAnimal: (obj, animal, animations, randomAnimation) => {
    let thumb = document.createElement('img')

    if (obj.thumbBox.querySelector('.animal-thumb') != null) {
      let oldThumb = obj.thumbBox.querySelector('.animal-thumb')
      obj.thumbBox.removeChild(oldThumb)
    }
    
    thumb.setAttribute('src', obj.thumbPath + '/' + animal.file + '.svg')
    thumb.setAttribute('alt', animal.name)
    thumb.setAttribute('class', 'animal-thumb')

    obj.thumbBox.appendChild(thumb)
    obj.animalName.innerHTML = animal.name

    obj.thumbBox.classList.remove(animations[randomAnimation])
    obj.animalName.classList.remove('fade')

    delete obj.playerWord.ontimeupdate

    obj.setWord(obj, animal)
    obj.playerWord.play()

    obj.setSound(obj, animal)
  },

  setWord: (obj, animal) => {
    let timeInit = animal.audio.word.start
    let timeEnd = animal.audio.word.end

    obj.playerWord.currentTime = timeInit

    obj.playerWord.ontimeupdate = () => {
      if (obj.playerWord.currentTime > timeEnd) {
        obj.playerWord.pause()
      }
    }
  },

  setSound: (obj, animal) => {
    while (obj.playerSound.hasChildNodes()) {
      obj.playerSound.removeChild(obj.playerSound.lastChild)
    }

    const audioFormats = [
      {
        type: 'audio/mp3',
        format: 'mp3'
      },
      {
        type: 'audio/ogg',
        format: 'ogg'
      }
    ]
    
    audioFormats.forEach((element, index) => {
      let soundElement = document.createElement('source')
      let soundSrc = `/audio/animals/${animal.file}.${element.format}`

      soundElement.setAttribute('src', soundSrc)
      soundElement.setAttribute('type', element.type)

      obj.playerSound.appendChild(soundElement)

      obj.playerSound.load()
    });
  }
}

function App(name) {
  return new BuildApp(name);
}

module.exports = App;
