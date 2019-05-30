const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const downloadPage = (url = '     https://github.com') => {
    console.log('downloading ', url)
    const fetchPage = (urlF, callback) => {
        const regexHttp = /^ *http:\/\//
        const regexHttps = /^ *https:\/\//
        let http_s = 0
        if (regexHttp.test(urlF)){
            http_s = require('http')
        } else if(regexHttps.test(urlF)) {
            http_s = require('https')
        } else {
            console.log('Invalid Url!')
        }
        http_s.get(urlF, (response) => {
            let buff = ''
            response.on('data', (chunk) => { 
                buff += chunk
            })
            response.on('end', () => {
                callback(null, buff)
            })
        }).on('error', (error) => {
            console.error(`Got error: ${error.message}`)
            callback(error)
        })
    }
    const folderName = uuidv1()
    fs.mkdirSync(folderName)
    fetchPage(url, (error, data) => {
        if (error) return console.log(error)
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)  
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
        console.log('downloading is done in folder ', folderName)
    })
}

downloadPage(process.argv[2])