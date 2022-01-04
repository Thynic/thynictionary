const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const meanings = document.querySelector('#meanings')

searchForm.addEventListener('submit', (e) => {
    meanings.textContent = ''
    e.preventDefault()

    const searchKey = search.value

    messageOne.textContent = 'Searching...'
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

    fetch(url + encodeURIComponent(searchKey)).then((response) => {
        response.json().then((data) => {
            if (data.title) {
                messageOne.textContent = data.title
            } else {
                messageOne.textContent = ''
                data.forEach((word, index) => {
                    const vocabType = document.createElement('p')
                    const found = word.word
                    let origin
                    if (word.origin) {
                        origin = word.origin
                        vocabType.innerHTML = found + ', <span id="origin">' + '('+ origin + ')' + '</span>'
                    } else {
                        vocabType.textContent = found + ':'
                    }
                    meanings.append(vocabType)
                    word.meanings.forEach((meaning , index) => {
                        meaning.definitions.forEach((def, index) => {
                            const eachDef = document.createElement('p')
                            if (meaning.partOfSpeech) {
                                eachDef.innerHTML = '<span id="type">' + meaning.partOfSpeech + '</span>' + ': ' + def.definition
                            } else {
                                eachDef.textContent = def.definition

                            }
                            eachDef.id = 'def'
                            meanings.append(eachDef)

                            
                            if (def.example) {
                                const eachExmp = document.createElement('p')
                                eachExmp.textContent = '"' + def.example +'"'
                                eachExmp.id = 'example'
                                meanings.append(eachExmp)
                            }
                        })
                    })
                })
            }
            search.value = ''
        })
    })
    
})

// const request = require('request')
// const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')
// const argv = yargs(hideBin(process.argv)).argv


// const searchWord = (searchKey) => {
//     const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchKey

//     request({ url, json: true }, (error, { body }) => {
//         if (body.title) {
//             console.log(body.title)
//         } else {
//             body.forEach((word, index) => {
//                 word.meanings.forEach((meaning, index) => {
//                     meaning.definitions.forEach((def, index) => {
//                         console.log(index+1 + ": " + def.definition)
//                     })
//                 })  
//             })
//         }
//     })
// }

// searchWord(argv.word)