export default class Zoo {
  constructor (animals) {
    this.animals = animals || []
  }

  getRandomAnimal () {
    let randomKey = Math.floor(Math.random() * this.animals.length)
    return this.animals[randomKey]
  }
}
