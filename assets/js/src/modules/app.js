import Screen from "./screen"
import Animals from "./animals"
import Zoo from "./zoo"

let screen = new Screen
const animals = Animals
const zoo = new Zoo(animals)

function BuildApp(name) {
  this.name = name;
  this.started = false
  this.thumbPath = 'assets/images/animals'

  this.animalName = document.querySelector('.animal .name')
  this.thumbBox = document.querySelector('.thumb-box')
  this.btnShuffle = document.querySelector('.shuffle')

  const obj = this
  this.init(obj)
}

BuildApp.prototype = {
  init: (obj) => {

    screen.init()

    window.addEventListener('keyup', function(event) {
      if (event.keyCode == 32) {
        if (!obj.started) {
          console.log('Space button to start')
          obj.start(obj)
        } else {
          console.log('Space button to play')
        }
      }
    })
  },

  start: (obj) => {
    screen.start()
    obj.started = true

    obj.btnShuffle.addEventListener('click', () => {
      let animal = zoo.getRandomAnimal()
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
    })
  }
}

function App(name) {
  return new BuildApp(name);
}

module.exports = App;