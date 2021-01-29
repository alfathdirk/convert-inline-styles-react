#!/usr/bin/env node

const fs = require('fs');
const { cwd } = require('process');
var fileArg = process.argv.slice(2)[0];

if (fileArg) {
    let filePathLocation = cwd() + '/' + fileArg;
    let stringFile = fs.readFileSync(filePathLocation, { encoding: 'utf-8'});
    let newStr = '';
    try {
        stringFile.match(/style=\{{(.*?)\}}/gms).map((v,k) => {
            newStr += v.replace(/^style=({)(.*)(\})$/gms, `style${k + 1}: $2,\n`)
        })

        let matcheds = 0;
        let replaceFile = stringFile.replace(/\{{(.*?)\}}/gms, (matched) => {
            matcheds++
            return `{styles.style${matcheds}}`
        });

        fs.writeFile(filePathLocation, replaceFile, (err) => {
            if (err) throw err;
            console.log('Saved file!');
        })

        let newFileStyle = `import {StyleSheet} from 'react-native';\nconst styles = StyleSheet.create({${newStr}})\n\nexport default styles;`;

        fs.writeFile(filePathLocation.substring(0,filePathLocation.length - 3) + '_styles.js', newFileStyle, (err) => {
            if (err) throw err;
            console.log('Saved style!');
        })

    } catch (error) {
        console.log('File Bersih dari inline Style');
    }
    return;
} 

console.info('Please input filename!');



// // let x = bracketMatches.replace(/\{{(.*?)\}}/gms, '**')

// // console.log(bracketMatches);