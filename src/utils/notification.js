import React from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from '../components/common/Notifications'

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
    progressClassName: 'toastErrorBar',
}


export const success = message => toast.success(<ToastContainer isError={false} message={message} />, toastSuccessConfig)
export const error = message => toast.error(<ToastContainer isError={true} message={message} />, toastErrorConfig)