import textToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import util from 'util'
import animals from '../modules/animals'

const client = new textToSpeech.TextToSpeechClient()

async function generateAudioFile(animal) {
  const text = 'dolphin'
  const request = {
    input: { text },
    voice: { languageCode: 'en-US-Standard-C', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' }
  }
  const [response] = await client.synthesizeSpeech(request)
  const writeFile = util.promisify(fs.writeFile)

  await writeFile('output.mp3', response.audioContent, 'binary')

  console.log('Audio content written to file: output.mp3')
}

console.log('Generate MP3')
generateAudioFile('fuck my wet pussy')
animals.forEach(animal => {
  console.log(animal.name)
  console.log(`testiculossssss`)
})
