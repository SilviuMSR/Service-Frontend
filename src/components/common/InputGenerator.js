import React from 'react'
import { TextField } from '@material-ui/core'

import RadioSelector from './RadioSelector'

class InputGenerator extends React.Component {

    shouldComponentUpdate(prevProps) {
        if (this.props.value !== prevProps.value || this.props.name !== prevProps.name) {
            return true
        }
        return false
    }

    render() {
        let { ...props } = this.props

        switch (props.type) {
            case 'radioSelector':
                return <RadioSelector
                    {...props}
                />
            default:
                return <TextField
                    variant="outlined"
                    {...props}
                />
        }
    }
}


export default InputGenerator