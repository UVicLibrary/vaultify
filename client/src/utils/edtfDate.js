import {months, seasons, descriptors} from './dateWords';
import edtf from 'edtf';

class EDTFDateConverter {
  constructor(input) {
    this.input = input;
  }
    scrub(str) {
        const cleanedString = str.trim()
            .toLowerCase()
            .replace(/[,.\\[\\]'"]/g, ' ')
            .replace(/(\d+)\s*(st|nd|rd|th)\b/g, '$1')
        return cleanedString
    }

    cleanWords(str) {
        let cleanedString = str.trim()
            .toLowerCase()
        for (let month in months) {
            if (months.hasOwnProperty(month)){
                cleanedString = cleanedString.replace(new RegExp(month, 'g'), months[month]);
            }   
        }
        for (let season in seasons) {
            if (seasons.hasOwnProperty(season)){
                cleanedString = cleanedString.replace(new RegExp(season, 'g'), seasons[season]);
            }   
        }
        for (let descriptor in descriptors) {
            if (descriptors.hasOwnProperty(descriptor)){
                cleanedString = cleanedString.replace(new RegExp(descriptor, 'g'), descriptors[descriptor]);
            }         
        }    
        return cleanedString
    }

    machineClean(input) {
        let cleanInput = input.replace(/open/g, '*')
            .replace(/unknown/g, '')
            .replace(new RegExp('[^\\du]u[^\\du]', 'g'), '')
        cleanInput = cleanInput.replace(/u/g, 'X')
        return cleanInput;
    }

    cleanExtraWords(str) {
        let cleanedString = str.trim()
            .replace(new RegExp('[a-z]','g'), '')
            .replace(/ +/g, ' ')
        return cleanedString    
    }
    addZeroes(str) {
        let cleanedString = str.trim()
            .replace(new RegExp('\\b(\\d)\\b', 'g'), '0$1')
            .replace(new RegExp('\\b([\\dX][\\dX][\\dX])[^\\dX]', 'g'), '$1X')

        return cleanedString      
    }


    addSeparators(str){
        const d4 = '[\\dX][\\dX][\\dX][\\dX][?~]?'
        const d2 = '[\\dX][\\dX][?~]?'
        let cleanedString = str.replace(new RegExp('([\\dX?~])\\s+([\\dX?~])', 'g'), '$1-$2')
            .replace(new RegExp(' ', 'g'), '')
            .replace(new RegExp('([\\du?~])/([\\du?~])', 'g'), '$1-$2')
            .replace(new RegExp('(' + d2 + '-' + d4 + ')-(' + d2 + '-' + d4 + ')', 'g'), '$1/$2')
            .replace(new RegExp('(' + d2 + '-' + d4 + ')-(' + d2 + '-' + d2 + '-' + d4 + ')', 'g'), '$1/$2')
            .replace(new RegExp('(' + d4 + ')-(' + d4 + ')', 'g'), '$1/$2')
            .replace(new RegExp('(' + d4 + '-' + d2 + ')-(' + d4 + ')', 'g'), '$1/$2')
            .replace(new RegExp('(' + d4 + '-' + d2 + '-' + d2 + ')-(' + d4 + ')', 'g'), '$1/$2')
        return cleanedString;
    }

    rearrange(str) {
        const d4 = '[\\dX][\\dX][\\dX][\\dX][?~]?'
        const d2 = '[\\dX][\\dX][?~]?'
        const arrange = function(str) {
            if (str.match(new RegExp(d4 + '-' + d2 + '-'+ d2, 'g'))) {
                console.log('here');
                return str
            } else if (str.match(new RegExp(d2 + '-' + d2 + '-'+ d4, 'g'))) {
                return str.replace(new RegExp('(' + d2 + ')-(' + d2 + ')-('+ d4 + ')', 'g'), '$3-$2-$1');
            } else if (str.match(new RegExp(d2 + '-' + d4 + '-'+ d2, 'g'))) {
                return str.replace(new RegExp('(' + d2 + ')-(' + d4 + ')-('+ d2 + ')', 'g'), '$2-$1-$3');
            } else if (str.match(new RegExp(d4 + '-'+ d2, 'g'))) {
                return str
            } else if (str.match(new RegExp(d2 + '-'+ d4, 'g'))) {
                return str.replace(new RegExp('(' + d2 + ')-('+ d4 + ')', 'g'), '$2-$1');
            }
            return str
        }
        if (str.indexOf('/') > -1){
            const splitString = str.split('/');
            return arrange(splitString[0]) + '/' + arrange(splitString[1]);
        } else {
            return arrange(str);
        }
    }

    dirty(input){
        let cleanInput = input.replace(/^\*|\*$/g, 'open').replace(/^\//g, 'unknown/').replace(/\/$/g, '/unknown');
        cleanInput = cleanInput.replace(/u/g, 'X');
        return cleanInput;    
    }

    dateIsEDTF(input) {
        const machinedInput = this.machineClean(input);
        try {
            edtf(machinedInput);
            return true;
        } catch (err) {}
        return false;
    }
    /*
    convertDate(input) {
        const cleanDate = rearrange(addSeparators(addZeroes(cleanExtraWords(machineClean(cleanWords(scrub(input)))))));
        if (dateIsEDTF(cleanDate)) {
            return dirty(cleanDate);
        }
        return '';
    }
    */

}


const scrub = function(str) {
    const cleanedString = str.trim()
        .toLowerCase()
        .replace(/[,.\\[\\]'"]/g, ' ')
        .replace(/(\d+)\s*(st|nd|rd|th)\b/g, '$1')
    return cleanedString
}

const cleanWords = function(str) {
    let cleanedString = str.trim()
        .toLowerCase()
    for (let month in months) {
        if (months.hasOwnProperty(month)){
            cleanedString = cleanedString.replace(new RegExp(month, 'g'), months[month]);
        }   
    }
    for (let season in seasons) {
        if (seasons.hasOwnProperty(season)){
            cleanedString = cleanedString.replace(new RegExp(season, 'g'), seasons[season]);
        }   
    }
    for (let descriptor in descriptors) {
        if (descriptors.hasOwnProperty(descriptor)){
            cleanedString = cleanedString.replace(new RegExp(descriptor, 'g'), descriptors[descriptor]);
        }         
    }    
    return cleanedString
}

const machineClean = function(input) {
    let cleanInput = input.replace(/open/g, '*')
        .replace(/unknown/g, '')
        .replace(new RegExp('[^\\du]u[^\\du]', 'g'), '')
    cleanInput = cleanInput.replace(/u/g, 'X')
    return cleanInput;
}

const cleanExtraWords = function(str) {
    let cleanedString = str.trim()
        .replace(new RegExp('[a-z]','g'), '')
        .replace(/ +/g, ' ')
    return cleanedString    
}
const addZeroes = function(str) {
    let cleanedString = str.trim()
        .replace(new RegExp('\\b(\\d)\\b', 'g'), '0$1')
        .replace(new RegExp('\\b([\\dX][\\dX][\\dX])[^\\dX]', 'g'), '$1X')

    return cleanedString      
}

const d4 = '[\\dX][\\dX][\\dX][\\dX][?~]?'
const d2 = '[\\dX][\\dX][?~]?'
const addSeparators = function(str) {
    let cleanedString = str.replace(new RegExp('([\\dX?~])\\s+([\\dX?~])', 'g'), '$1-$2')
        .replace(new RegExp(' ', 'g'), '')
        .replace(new RegExp('([\\du?~])/([\\du?~])', 'g'), '$1-$2')
        .replace(new RegExp('(' + d2 + '-' + d4 + ')-(' + d2 + '-' + d4 + ')', 'g'), '$1/$2')
        .replace(new RegExp('(' + d2 + '-' + d4 + ')-(' + d2 + '-' + d2 + '-' + d4 + ')', 'g'), '$1/$2')
        .replace(new RegExp('(' + d4 + ')-(' + d4 + ')', 'g'), '$1/$2')
        .replace(new RegExp('(' + d4 + '-' + d2 + ')-(' + d4 + ')', 'g'), '$1/$2')
        .replace(new RegExp('(' + d4 + '-' + d2 + '-' + d2 + ')-(' + d4 + ')', 'g'), '$1/$2')
    return cleanedString;
}

const rearrange = function(str) {
    const arrange = function(str) {
        if (str.match(new RegExp(d4 + '-' + d2 + '-'+ d2, 'g'))) {
            return str
        } else if (str.match(new RegExp(d2 + '-' + d2 + '-'+ d4, 'g'))) {
            return str.replace(new RegExp('(' + d2 + ')-(' + d2 + ')-('+ d4 + ')', 'g'), '$3-$2-$1');
        } else if (str.match(new RegExp(d2 + '-' + d4 + '-'+ d2, 'g'))) {
            return str.replace(new RegExp('(' + d2 + ')-(' + d4 + ')-('+ d2 + ')', 'g'), '$2-$1-$3');
        } else if (str.match(new RegExp(d4 + '-'+ d2, 'g'))) {
            return str
        } else if (str.match(new RegExp(d2 + '-'+ d4, 'g'))) {
            return str.replace(new RegExp('(' + d2 + ')-('+ d4 + ')', 'g'), '$2-$1');
        }
        return str
    }
    if (str.indexOf('/') > -1){
        const splitString = str.split('/');
        return arrange(splitString[0]) + '/' + arrange(splitString[1]);
    } else {
        return arrange(str);
    }
}

const dirty = function dirtyInput(input) {
    let cleanInput = input.replace(/^\*|\*$/g, 'open').replace(/^\//g, 'unknown/').replace(/\/$/g, '/unknown');
    cleanInput = cleanInput.replace(/u/g, 'X');
    return cleanInput;    
}

const dateIsEDTF = function checkIfStringIsValidEDTF(input) {
    const machinedInput = machineClean(input)
    try {
        edtf(machinedInput);
        return true;
    } catch (err) {
        //console.log('Input is not valid EDTF')
    }
    return false;
}

const convertDate = function convertUnknownFormatToEDTFDate(input) {
    const cleanDate = rearrange(addSeparators(addZeroes(cleanExtraWords(machineClean(cleanWords(scrub(input)))))));
    if (dateIsEDTF(cleanDate)) {
        return dirty(cleanDate);
    }
    return '';
}

export {
    dateIsEDTF,
    convertDate,
    EDTFDateConverter
}
/*
let reallyHard = "the dates to are from [199-?] to 2004?-uu-25 bujt we don't know for too sure"
let sample = "4th century"
let hard = 'the datees are from about january 22nd 1992 to 2005.'
let medium = '1991 jan 2/unknown'
let easy = '1991-2003'
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = scrub(reallyHard);
hard = scrub(hard);
medium = scrub(medium);
easy = scrub(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = cleanWords(reallyHard);
hard = cleanWords(hard);
medium = cleanWords(medium);
easy = cleanWords(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = machineClean(reallyHard);
hard = machineClean(hard);
medium = machineClean(medium);
easy = machineClean(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = cleanExtraWords(reallyHard);
hard = cleanExtraWords(hard);
medium = cleanExtraWords(medium);
easy = cleanExtraWords(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = addZeroes(reallyHard);
hard = addZeroes(hard);
medium = addZeroes(medium);
easy = addZeroes(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = addSeparators(reallyHard);
hard = addSeparators(hard);
medium = addSeparators(medium);
easy = addSeparators(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
reallyHard = rearrange(reallyHard);
hard = rearrange(hard);
medium = rearrange(medium);
easy = rearrange(easy);
console.log('---')
console.log(reallyHard)
console.log(hard);
console.log(medium);
console.log(easy);
*/