const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
const animals = require('../animals.json')
const report = require('yurnalist')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')

const client = new textToSpeech.TextToSpeechClient()

const convertAudioToOgg = async (animal, folder) => {
  return new Promise(async (resolve, reject) => {
    return ffmpeg()
      .input(`${folder}/${animal}.mp3`)
      .toFormat('ogg')
      .output(`${folder}/${animal}.ogg`)
      .on('end', resolve)
      .on('error', reject)
      .run()
  })
}

const generateAudioFile = async animal => {
  const text = animal
  const folder = path.resolve(__dirname, '..', '..', 'audio', 'names')
  const request = {
    input: { text },
    voice: { languageCode: 'en-US-Standard-C', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' }
  }

  const spinner = report.activity()
  spinner.tick(`Fetching audio for ${animal}`)

  try {
    const [response] = await client.synthesizeSpeech(request)
    const writeFile = util.promisify(fs.writeFile)
    const fileNameMp3 = `${animal}.mp3`

    await writeFile(`${folder}/${fileNameMp3}`, response.audioContent, 'binary')
    await convertAudioToOgg(animal, folder)
    report.success(`mp3 and ogg files for ${animal}`)
  } catch (err) {
    report.error(err)
  }

  spinner.end()
}

report.info('Fetching audio files...')
console.log('')

animals.forEach(async animal => {
  const animalName = animal.name.toLowerCase()
  await generateAudioFile(animalName)
})
