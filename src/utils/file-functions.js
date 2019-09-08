const Promise = require('bluebird');

// turns off forgotten return warning in Bluebird
Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

const fs = Promise.promisifyAll(require('fs'));

// this function accesses the file system
// it returns a promise

export const getAllFiles = (dir) => {
    return fs.readdirAsync(dir)
    .then(fileNamesArr => {
        const fileStatPromises = fileNamesArr.map(fileName => {
        return fs.statAsync(dir + '/' + fileName)
        .then(stats => {
            const file = {};
            file.filePath = dir + '/' + fileName;
            file.isDirectory = !stats.isFile();
            return file;
        });
        });
        return Promise.all(fileStatPromises);
  });
};

export const storytellerProjectFileExists = (dir) => {
    return fs.readdirAsync(dir).then(fileNamesArr => {

        let fileNameExists = false;

        fileNamesArr.forEach(fileName => {
            fileNameExists =  fileName == "project.st";
        })
        
        return fileNameExists;
    });
};

export const saveProject = (filePath, projectState) => {
    let content = JSON.stringify(projectState);
    return fs.writeFile(filePath, content, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
};
