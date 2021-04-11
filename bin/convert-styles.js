#!/usr/bin/env node

const fs = require('fs');
const { cwd } = require('process');
const beautify = require('js-beautify').js;
const fileArg = process.argv.slice(2)[0];
if (fileArg) {
    let filePathLocation = cwd() + '/' + fileArg;
    let stringFile = fs.readFileSync(filePathLocation, { encoding: 'utf-8'});
    // let newStr = '';
    let idx = 0;
    let objStyles = [];
    let reg = /style=\{{(.*?)\}}/gms;
    let match = reg.exec(stringFile);
    let styleFile = '';

    try {
        do {
            let objStyle = match[1].replace(/\s/gm,'');
            let getIdx = objStyles.indexOf(objStyle);
            match[0].replace(new RegExp(reg), () => {
                if(getIdx < 0) {
                    objStyles.push(objStyle)
                    idx+=1;
                    styleFile += `style${idx}: {${objStyle}},`
                } 
            });
        } while((match = reg.exec(stringFile)) !== null);

        // replacing file
        let i = 0;
        let styles = [];
        let replaceFile = stringFile.replace(reg, (matched) => {
            let trimStyles = matched.replace(/\s/gm,'');
            let idxOfStyles = styles.indexOf(trimStyles);
            if( idxOfStyles < 0) {
                styles.push(trimStyles);
                i+=1;
                return `style={styles.style${i}}`
            } else {
                return `style={styles.style${idxOfStyles + 1}}`
            }
        });

        let resultStyle = beautify(`let style = {${styleFile}}`, {indent_size: 2});

        fs.writeFile(filePathLocation, replaceFile, (err) => {
            if (err) throw err;
            console.info('Saved file!');
        })

        fs.writeFile(filePathLocation.substring(0,filePathLocation.length - 3) + '_styles.js', resultStyle, (err) => {
            if (err) throw err;
            console.info('Saved style!');
        })

    } catch (error) {
        console.info('File Bersih dari inline Style', error.message);
    }
    return;
} 


console.info('Please input filename!');
