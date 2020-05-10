import validator from 'validator'

export const validations = {
    notEmpty: value => !validator.isEmpty(value),
    isEmail: value => validator.isEmail(value),
    notZero: value => value > 0,
    isPhoneNumber: value => validator.isMobilePhone(value)
}