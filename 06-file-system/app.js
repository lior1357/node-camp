const promisify = require('util');
const fs = require('fs');


const promisify = (callback) =>{
    return (...args) => {
        return new Promise((resolve, reject) => {
            callback(...args, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

const readFilePromise = promisify(fs.readFile);
(async () => {
    const indexData = await readFilePromise('./index.txt', 'utf-8')
    const index2Data = await readFilePromise(indexData, 'utf-8')
    const index3Data = await readFilePromise(index2Data, 'utf-8')
    console.log(index3Data)
})()
