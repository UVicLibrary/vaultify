import {months, seasons, descriptors} from './dateWords';
import edtf from 'edtf';


const scrub = function(str) {
    const cleanedString = str.trim()
        .toLowerCase()
        .replace(/[\|,.\[\]'"]/g, ' ')
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
    convertDate
}