import * as TYPES from '../actionTypes'

const initialState = {
   language: 'EN',
   i18n: require('../../utils/languages/EN.json')
}

function changeLanguage(state = initialState, action) {
  switch (action.type) {
    case TYPES.TOPBAR_CHANGE_LANGUAGE:
      return {...state, language: action.payload.lang, i18n: action.payload.i18n}
    default:
      return state
  }
}

export default changeLanguage