const Txt2Audio = require('txt2audio')
const path = require('path')

const animals = require('../animals.json')

animals.forEach(async animal => {
  const animalName = animal.name.toLowerCase()
  const txt2audio = Txt2Audio({
    text: animalName,
    filename: animalName,
    path: path.resolve(__dirname, '..', '..', 'audio', 'names'),
    gender: 'female',
    ogg: true,
    debug: true
  })

  await txt2audio.generateAudio()
})
