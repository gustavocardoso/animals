const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
const animals = require('../animals.json')
const report = require('yurnalist')
const path = require('path')

const client = new textToSpeech.TextToSpeechClient()

async function generateAudioFile(animal) {
  const text = animal
  const fileName = animal.toLowerCase()
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
    const folder = path.resolve(__dirname, '..', '..', 'audio', 'names')

    await writeFile(
      `${folder}/${fileName}.mp3`,
      response.audioContent,
      'binary'
    )

    report.success(`file: ${fileName}.mp3`)
  } catch (err) {
    report.error(err)
  }

  spinner.end()
}

report.info('Fetching audio files...')

animals.forEach(animal => {
  generateAudioFile(animal.name)
})
