import { toast } from 'react-toastify'

const toastSuccessConfig = {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'toastSuccess',
    bodyClassName: 'toastSuccessBody',
    progressClassName: 'toastSuccessBar'
}

const toastErrorConfig = {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'toastError',
    bodyClassName: 'toastErrorBody',
    progressClassName: 'toastErrorBar'
}

export const success = message => toast.success(message, toastSuccessConfig)
export const error = message => toast.error(message, toastErrorConfig)