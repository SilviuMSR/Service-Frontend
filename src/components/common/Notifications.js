import React from 'react'
import { withStyles } from '@material-ui/core'
import { CheckBoxOutlined, ErrorOutlineSharp } from '@material-ui/icons'

export const ToastContainer = withStyles({
    icon: {
        fontSize: '20px',
        color: '#ffffff',
        padding: '0px 15px 0px 10px',
        position: 'relative',
        float: 'left'
    },
    textContainer: {
        height: '30px',
        lineHeight: '22px'
    },
    message: {
        display: 'inline-block',
        width: '245px'
    }
})(({ message, classes, isError }) => {
    let icon = isError ? <ErrorOutlineSharp className={classes.icon} /> : <CheckBoxOutlined className={classes.icon} />
    return <div className={classes.textContainer}>{icon}<div className={classes.message}>{message}</div></div>
})