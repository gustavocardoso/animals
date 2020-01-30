import animalsData from '../animals.json'

let animalsFiles = {}
const files = new Map()

const importAll = requireContext =>
  requireContext.keys().forEach(key => {
    animalsFiles[key.replace('./', '').replace('.svg', '')] = requireContext(
      key
    )
  })

importAll(require.context('../../../images/animals', false, /.*\.svg$/))

const animalsFilesKeys = Object.entries(animalsFiles)

for (const [animal, file] of animalsFilesKeys) {
  files.set(`${animal}`, file)
}

let newAnimal = null

const animals = animalsData.map(animal => {
  const animalName = animal.name.toLowerCase()

  newAnimal = {
    ...animal,
    file: files.get(animalName)
  }

  return newAnimal
})

export default animals
