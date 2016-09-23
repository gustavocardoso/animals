export default class Screen {

  constructor() {
    this.startScreen = 'intro'
  }

  init() {
    this.setCurrentScreen(this.startScreen)
    document.querySelector('.' + this.startScreen).classList.add('active')
  }

  start() {
    this.setCurrentScreen('app')
    this.showCurrentScreen()
  }

  setCurrentScreen(screen) {
    this.currentScreen = screen
  }

  getCurrentScreen() {
    return this.currentScreen
  }

  showCurrentScreen() {
    let screen = this.getCurrentScreen()
    this.hideCurrentScreen()
    document.querySelector('.' + screen).classList.add('active')
    this.setCurrentScreen(screen)
  }

  hideCurrentScreen() {
    let current = this.getCurrentScreen()
    document.querySelector('.' + current).classList.remove('active')
  }

}