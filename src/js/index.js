import Screen from './modules/screen'
import Animals from './modules/animals'
import Zoo from './modules/zoo'
import './assets'

import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if ('serviceWorker' in navigator) {
  const registration = runtime.register()
}

const screen = new Screen()
const animals = Animals
const zoo = new Zoo(animals)

class App {
  constructor(name) {
    this.started = false
    this.soundReady = false
    this.isShuffling = false
    this.container = document.querySelector('.animal')
    this.animalName = document.querySelector('.animal .name')
    this.instructions = document.querySelector('.animal .instructions')
    this.thumbBox = document.querySelector('.thumb-box')
    this.btnStart = document.querySelector('.start-app')
    this.btnShuffle = document.querySelector('.shuffle')
    this.btnPlay = document.querySelector('.play')
    this.playerSound = document.querySelector('.player-sound')
  }

  init() {
    screen.init()

    window.addEventListener('keyup', this.manageKeyEvents.bind(this), false)

    this.btnStart.addEventListener(
      'click',
      () => {
        if (!this.started) {
          this.start()
        }
      },
      false
    )
  }

  manageKeyEvents(event) {
    if (event.keyCode === 32) {
      if (!this.started) {
        this.start()
      }
    } else if (event.keyCode === 83) {
      if (this.started) {
        this.btnShuffle.click()
      }
    } else if (event.keyCode === 80) {
      if (this.started && this.soundReady) {
        this.btnPlay.click()
      }
    }
  }

  start() {
    this.started = true

    screen.start()

    this.btnShuffle.addEventListener(
      'click',
      () => {
        this.shuffle()
      },
      false
    )
  }

  shuffle() {
    if (!this.isShuffling) {
      let animations = ['shuffle', 'shuffle-alt']
      let randomAnimation = Math.floor(Math.random() * animations.length)

      this.isShuffling = true
      this.btnShuffle.classList.add('disabled')
      this.btnPlay.classList.add('disabled')
      this.soundReady = false

      if (!this.playerSound.paused) {
        this.playerSound.pause()
        this.playerSound.currentTime = 0
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
        this.thumbBox.addEventListener(
          'animationend',
          this.createAnimal(animal, animations, randomAnimation),
          false
        )
        this.btnShuffle.classList.remove('disabled')
        this.isShuffling = false
      }, 300)
    }
  }

  createAnimal(animal, animations, randomAnimation) {
    let thumb = document.createElement('img')
    // let thumbSrc = animal.file.replace('../', 'public/')

    if (this.thumbBox.querySelector('.animal-thumb') != null) {
      let oldThumb = this.thumbBox.querySelector('.animal-thumb')
      this.thumbBox.removeChild(oldThumb)
    }

    thumb.setAttribute('src', animal.file)
    thumb.setAttribute('alt', animal.name)
    thumb.setAttribute('class', 'animal-thumb')

    this.thumbBox.appendChild(thumb)
    this.animalName.innerHTML = animal.name

    this.thumbBox.classList.remove(animations[randomAnimation])
    this.animalName.classList.remove('fade')

    this.setWord(animal)
    this.setSound(animal)
  }

  setWord(animal) {
    let synth

    if ('speechSynthesis' in window) {
      synth = new SpeechSynthesisUtterance()
      synth.volume = 1
      synth.rate = 0.8
      synth.lang = 'en-US'

      speechSynthesis.getVoices().forEach(voice => {
        console.log(voice.name, voice.lang, voice.localService)
      })
    }

    if (!speechSynthesis.speaking) {
      synth.text = animal.name

      setTimeout(() => {
        speechSynthesis.speak(synth)
      }, 300)
    }
  }

  setSound(animal) {
    let timeInit = animal.audio.sound.start
    let timeEnd = animal.audio.sound.end

    this.playerSound.currentTime = timeInit
    this.btnPlay.classList.remove('disabled')

    this.soundReady = true

    this.btnPlay.addEventListener('click', () => {
      this.playerSound.play()
      this.btnPlay.classList.add('disabled')
    })

    this.playerSound.ontimeupdate = () => {
      if (this.playerSound.currentTime > timeEnd) {
        this.playerSound.pause()
        this.playerSound.currentTime = timeInit
        this.btnPlay.classList.remove('disabled')
      }
    }
  }
}

const myApp = new App()

myApp.init()
