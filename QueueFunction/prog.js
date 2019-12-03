const fs = require('fs');

const source1 = './Source1';
const target1 = './Target1';
const startTime1 = 14;
const endTime1 = 15;

const source2 = './Source2';
const target2 = './Target2';
const startTime2 = 15;
const endTime2 = 16;

const readFiles = (directory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, list) => {
            if (err) return reject(err);
            return resolve(list);
        });
    });
}

const copyFile = (source, target) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, target, async (err) => {
            if (err) {
                console.log('Failed : ' + source + '->' + target);
                reject(err);
            }
            await deleteFile(source);
            console.log('Successful : ' + source + '->' + target);
            return resolve();
        });
    });
}

const deleteFile = (source) => {
    return new Promise((resolve, reject) => {
        fs.unlink(source, (err) => {
            if (err) {
                console.log('Failed to delete: ' + source);
                reject(err);
            }
            return resolve();
        });
    });
}

(async () => {

    // Copy from Source 1 -> Target 1
    while (1) {
        // Get time
        let date = new Date();
        let currentHour = date.getHours();

        // Copy sequence 1 
        const files1 = await readFiles(source1);
        if (files1.length && currentHour >= startTime1 && currentHour < endTime1) {
            // Select first file
            const file = files1[0];
            // Copy file
            await copyFile(source1 + '/' + file, target1 + '/' + file);
        }

        // Copy sequence 2
        const files2 = await readFiles(source2);
        if (files2.length && currentHour >= startTime2 && currentHour < endTime2) {
            // Select first file
            const file = files2[0];
            // Copy file
            await copyFile(source2 + '/' + file, target2 + '/' + file);
        }
    }

})();
