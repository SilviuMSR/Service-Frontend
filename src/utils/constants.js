export const INVOICES_URL = 'http://localhost:9000/static/invoices/'

export const EDIT = 'edit'
export const CREATE = 'create'

export const RESERVATION_PANDING = 'PENDING'
export const RESERVATION_ACCEPTED = 'ACCEPTED'
export const RESERVATION_DECLINED = 'DECLINED'
export const RESERVATION_IN_PROGRESS = 'IN_PROGRESS'
export const RESERVATION_DONE = 'DONE'

export const RENDER_RESERVATION_ADMIN = 'ADMIN'
export const RENDER_RESERVATION_EMPLOYEE = 'EMPLOYEE'
export const RENDER_RESERVATION_PERSONAL = 'PERSONAL'

export const PROBLEM = 'knowingStatus'
export const CAR_BRAND_ID = 'carBrandId'
export const NO = 'NO'
export const YES = 'YES'

export const MODEL_TYPE = "MODEL_TYPE"
export const BRAND_TYPE = "BRAND_TYPE"
export const RESERVATION_TYPE = "RESERVATION_TYPE"

export const DEFAULT_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss'
export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY'
export const INPUT_TYPE_DATE_FORMAT = 'YYYY-MM-DD'

export const DETAILS_TAB = 'DETAILS'
export const PROBLEMS_TAB = 'PROBLEMS'
export const INVOICES_TAB = 'INVOICES'

export const VACATION_ACCEPTED = 'ACCEPTED'
export const VACATION_PENDING = 'PENDING'
export const VACATION_DECLINED = 'DECLINED'

export const LANGUAGES = [
    { name: '', value: false },
    { name: 'RO', value: false },
    { name: 'EN', value: false }
]

export const HOMEPAGE_OPTIONS = [
    { name: 'REZERVARE', value: true, icon: 'ResIcon' },
    { name: 'LOGIN', value: false, icon: 'LoginIcon' }
]

export const PROBLEM_DIFFICULTY = [
    { label: '', value: false },
    { label: 'EASY', value: false },
    { label: 'MEDIUM', value: false },
    { label: 'HARD', value: false },
]

export const USER_POSITION = [
    { label: '', value: false },
    { label: 'EMPLOYEE', value: false },
    { label: 'ADMIN', value: false }
]

export const USER_STATUS = [
    { label: '', value: false },
    { label: 'AVAILABLE', value: false },
    { label: 'ONVACATION', value: false }
]

export const CHECK_TIME_TYPE = [
    { label: '', value: false },
    { label: 'minutes', value: false },
    { label: 'hours', value: false },
    { label: 'days', value: false }
]

export const RESERVATION_PROBLEMS_OPTION = [
    { label: 'Da', value: false, name: 'yes' },
    { label: 'Nu', value: false, name: 'no' },
]

export const RESERVATION_PROBLEMS_LIST = [
    { label: 'Filtru de ulei', value: false },
    { label: 'Distributie', value: false },
    { label: 'Schimbare far', value: false }
]