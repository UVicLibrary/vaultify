import * as ActionTypes from '../constants/ActionTypes';
import * as DynamicAttributes from '../constants/DynamicAttributes';
import {
  calculateDate,
  calculateLanguage,
  calculateType,
} from '../utils/calculator'


export function actuallyUpdateOriginal(attribute, row, value) {
  return {
    type: ActionTypes.UPDATE_ORIGINAL,
    attribute,
    row,
    value,
  }
}

function cleanForAPI(str) {
  return str.substring(0, 15)
}

function cleanForAAATAPI(str) {
  return str.substring(0, 15).split(" ")[0]
}

export function updateOriginal(attribute, row, value) {
  return dispatch => {
    dispatch(actuallyUpdateOriginal(attribute, row, value))
    const adjustedValues = []
    switch(attribute){
      case DynamicAttributes.creator:
      case DynamicAttributes.contributor:
        value.forEach(element => {
          if (element === ""){
            return
          }
          element = cleanForAPI(element)
          fetch('/fast/suggestall/' + element)
            .then(res => res.json())
            .then(json => {
              adjustedValues.push(json.names[0])
              dispatch(updateAdjusted(attribute, row, adjustedValues))
            })
            .catch(err => {
              console.error(err.stack)
            })
        });
        break;
      case DynamicAttributes.subject:
        value.forEach(element => {
          if (element === ""){
            return
          }   
          element = cleanForAPI(element)       
          fetch('/fast/suggestall/' + element)
            .then(res => res.json())
            .then(json => {
              adjustedValues.push(json.names[0])
              dispatch(updateAdjusted(attribute, row, adjustedValues))
            })
            .catch(err => {
              console.error(err.stack)
            })
        });
        break;    
      case DynamicAttributes.geographic_coverage:
        value.forEach(element => {
          if (element === ""){
            return
          }
          element = cleanForAPI(element)
          element = element.replace("B.C.", 'British')
          fetch('/fast/suggest51/' + element)
            .then(res => res.json())
            .then(json => {
              adjustedValues.push(json.names[0])
              dispatch(updateAdjusted(attribute, row, adjustedValues))
            })
            .catch(err => {
              console.error(err.stack)
            })
        });
        break;
      case DynamicAttributes.date_created:
      case DynamicAttributes.chronological_coverage:
      case DynamicAttributes.date_digitized:
        value.forEach(element => {
          calculateDate(element)
            .then(res => adjustedValues.push(res))
            .then(() => dispatch(updateAdjusted(attribute, row, adjustedValues)))
            .catch(rej => {})
        })        
        break;
      case DynamicAttributes.language:
        value.forEach(element => {
          calculateLanguage(element)
            .then(res => adjustedValues.push(res))
            .then(() => dispatch(updateAdjusted(attribute, row, adjustedValues)))
            .catch(err => {console.log(err)})
        });   
        break;
      case DynamicAttributes.resource_type:
        value.forEach(element => {
          calculateType(element)
            .then(res => adjustedValues.push(res))
            .then(() => dispatch(updateAdjusted(attribute, row, adjustedValues)))
            .catch(err => {})
        });      
        break;
      case DynamicAttributes.genre:
        value.forEach(element => {
          if (element === ""){
            return
          }   
          element = cleanForAAATAPI(element)       
          fetch('/aat/' + element)
            .then(res => res.json())
            .then(json => {
              adjustedValues.push(json.names[0])
              dispatch(updateAdjusted(attribute, row, adjustedValues))
            })
            .catch(err => {
              console.error(err.stack)
            })
        });
        break;
      default:
        break;
    }
  }
}

export function updateAdjusted(attribute, row, value) {
  value = value.filter(v => {return value !== ""});
  return {
    type: ActionTypes.UPDATE_ADJUSTED,
    attribute,
    row,
    value,
  }
}

export function updateFlat(attribute, row, value) {
  return {
    type: ActionTypes.UPDATE_FLAT,
    attribute,
    row,
    value,
  }
}

export function updateHeaders(value) {
  return {
    type: ActionTypes.UPDATE_HEADERS,
    value
  }
}

export function updateFilename(value) {
  return {
    type: ActionTypes.UPDATE_FILENAME,
    value
  }
}