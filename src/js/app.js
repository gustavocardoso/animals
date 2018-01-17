import Screen from './modules/screen'
import Animals from './modules/animals'
import Zoo from './modules/zoo'

let screen = new Screen()
const animals = Animals
const zoo = new Zoo(animals)

class App {
  constructor (name) {
    this.name = name
    this.started = false
    this.thumbPath = '/images/animals'

    this.container = document.querySelector('.animal')
    this.animalName = document.querySelector('.animal .name')
    this.instructions = document.querySelector('.animal .instructions')
    this.thumbBox = document.querySelector('.thumb-box')
    this.btnStart = document.querySelector('.start-app')
    this.btnShuffle = document.querySelector('.shuffle')
    this.playerWord = document.querySelector('.player-word')
    this.playerSound = document.querySelector('.player-sound')
  }

  init () {
    screen.init()

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 32) {
        if (!this.started) {
          this.start()
        }
      }
    }, false)

    this.btnStart.addEventListener('click', () => {
      if (!this.started) {
        this.start()
      }
    }, false)
  }

  start () {
    this.started = true

    screen.start()

    this.btnShuffle.addEventListener('click', () => {
      this.shuffle()
    }, false)

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 32) {
        console.log('pohan')
      } else if (event.keyCode === 83) {
        this.shuffle()
      }
    }, false)
  }

  shuffle () {
    console.log('shuffle')
    let animations = ['shuffle', 'shuffle-alt']
    let randomAnimation = Math.floor(Math.random() * animations.length)

    if (!this.playerWord.paused) {
      this.playerWord.pause()
      this.playerWord.currentTime = 0
    }

    if (document.querySelector('.animal .instructions') !== null) {
      this.thumbBox.removeChild(this.instructions)
    }

    let thumb = document.querySelector('.animal-thumb')

    if (thumb != null) {
      this.thumbBox.removeChild(thumb)
    }

    this.thumbBox.classList.add(animations[randomAnimation])
    this.animalName.classList.add('fade')

    let animal = zoo.getRandomAnimal()

    setTimeout(() => {
      this.thumbBox.addEventListener('animationend', this.createAnimal(animal, animations, randomAnimation), false)
    }, 300)
  }

  createAnimal (animal, animations, randomAnimation) {
    console.log(animal)
    let thumb = document.createElement('img')

    if (this.thumbBox.querySelector('.animal-thumb') != null) {
      let oldThumb = this.thumbBox.querySelector('.animal-thumb')
      this.thumbBox.removeChild(oldThumb)
    }

    thumb.setAttribute('src', this.thumbPath + '/' + animal.file + '.svg')
    thumb.setAttribute('alt', animal.name)
    thumb.setAttribute('class', 'animal-thumb')

    this.thumbBox.appendChild(thumb)
    this.animalName.innerHTML = animal.name

    this.thumbBox.classList.remove(animations[randomAnimation])
    this.animalName.classList.remove('fade')

    delete this.playerWord.ontimeupdate

    this.setWord(animal)
    this.playerWord.play()

    this.setSound(animal)
  }

  setWord (animal) {
    let timeInit = animal.audio.word.start
    let timeEnd = animal.audio.word.end

    this.playerWord.currentTime = timeInit

    this.playerWord.ontimeupdate = () => {
      if (this.playerWord.currentTime > timeEnd) {
        this.playerWord.pause()
      }
    }
  }

  setSound (animal) {
    while (this.playerSound.hasChildNodes()) {
      this.playerSound.removeChild(this.playerSound.lastChild)
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

      this.playerSound.appendChild(soundElement)

      this.playerSound.load()
    })
  }
}

const myApp = new App('Pet Sounds')

myApp.init()
