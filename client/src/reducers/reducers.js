import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes';


function dynamicRow(state = {
  original: [],
  adjusted: [],
  url: []
}, action) {
  switch(action.type) {
    case ActionTypes.UPDATE_ORIGINAL:
      return Object.assign({}, state, {
        original: action.value,
      });
    case ActionTypes.UPDATE_ADJUSTED:
      return Object.assign({}, state, {
        adjusted: action.value
      });
    default:
      return state;
  }
}

function dynamicRows(state = [], action) {
  switch(action.type) {
    case ActionTypes.UPDATE_ORIGINAL:
    case ActionTypes.UPDATE_ADJUSTED:
      let copy = [...state]
      copy[action.row] = dynamicRow(state[action.row], action) 
      return copy
    default:
      return state;
  }
}

function dynamicAttributes(state = {
  creator: [],
  contributor: [],
  subject: [],
  geographic_coverage: [],
  date_created: [],
  chronological_coverage: [],
  date_digitized: [],
  language: [],
  resource_type: [],
  genre: []
}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ORIGINAL:
    case ActionTypes.UPDATE_ADJUSTED:
      return Object.assign({}, state, {
        [action.attribute]: dynamicRows(state[action.attribute], action)
      })
    default:
      return state
  }  
}

function flatRows(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FLAT:
      let copy = [...state]
      copy[action.row] = action.value
      return copy  
    default:
      return state
  }
}

function flatAttributes(state = {title: []}, action) {
  switch(action.type) {
    case ActionTypes.UPDATE_FLAT:
      if (!state[action.attribute]) {
        state[action.attribute] = []
      }
      return Object.assign({}, state, {
        [action.attribute]: flatRows(state[action.attribute], action)
      })
    default:
      return state
  }
}

function headers(state = [], action) {
  switch(action.type) {
    case ActionTypes.UPDATE_HEADERS:
      return action.value
    default:
      return state
  }
}

const atlasReducers = combineReducers({
   dynamicAttributes,
   flatAttributes,
   headers,
})

export default atlasReducers