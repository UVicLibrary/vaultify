import {dcmi, iso} from '../constants/data'
import {dateIsEDTF, convertDate} from './edtfDate'

function closestMatch(str, strArray) {
  str = str.toLowerCase().replace(/\s/g, '');
  let subStr = "";
  let count = 1;
  let prevStrArray = [...strArray]
  while(strArray.length > 1 && subStr.length < str.length) {
      prevStrArray = [...strArray]
      subStr = str.substring(0, count)
      strArray = strArray.filter(value => {return value.toLowerCase().indexOf(subStr) !== -1})
      count = count + 1;
  }
  if (!strArray[0]){
    return prevStrArray[0]
  }
  return strArray[0]
}


export function calculateDate(value) {
  return new Promise ((resolve, reject) => {
    const newDate = convertDate(value);
    if (dateIsEDTF(newDate)){
      resolve(newDate);
    } else {
      reject(newDate);
    }
  })
}

export function calculateType(value) {
  return new Promise ((resolve, reject) => {
    if (!value) {
      reject("")
      return
    } 
    if (dcmi.includes(value)) {
      resolve(value)
      return
    }
    resolve(closestMatch(value, dcmi))
  })
}

export function calculateFast(value, queryIndex="suggestAll") {
  return new Promise ((resolve, reject) => {
    if (!value) {
      resolve("")
    }
    if (!['suggest00', 'suggest50', 'suggest51', 'suggestAll'].includes(queryIndex)){
      reject('invalid query index')
    }
    fetch(new Request('/fastapi/' + this.original + '/' + this.fastQueryIndex))
      .then(res => res.json())
      .then(resObj => {
        if (resObj.names[0]) {
          resolve(resObj.names)
        } else {
          reject("No matches")
        }
      })
      .catch(rej => {
        reject(rej)
      })
  })
}

export function calculateLanguage(value) {
  return new Promise ((resolve, reject) => {
    if (!value) {
      reject("");
    } 
    value = value.toLowerCase().replace(/\s/g, '')
    switch(value.length){
      case(2):
        let foundTwo = iso.some(element => {
          if (value === element['alpha2']) {
            resolve(element['alpha3-b'])
            return true
          }
          return false;
        })
        if (foundTwo) return;
        break;
      case(3):
        const foundThree = iso.some(element => {
          if (value === element['alpha3-b']) {
            resolve(value)
            return true
          }
          return false
        })
        if (foundThree) return;
        break;
      default:
        break;
    }
    let result = ""
    const englishs = iso.map(element => {return element['alpha3-b'] + element.English})
    result = closestMatch(value, englishs).substring(0,3)

    resolve(result);    
  })
}
