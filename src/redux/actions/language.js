import * as TYPES from '../actionTypes'

export const changeLanguage = language =>
    function (dispatch) {
        let i18n = require(`../../utils/languages/${language.toUpperCase()}.json`)
        dispatch({
            type: TYPES.TOPBAR_CHANGE_LANGUAGE,
            payload: { lang: language, i18n }
        })

        return Promise.resolve({})
    }