import React from 'react'
import { TextField } from '@material-ui/core'

import RadioSelector from './RadioSelector'
import MultiSelector from './MultipleSelector'
import DropdownSelector from './DropdownSelector'

class InputGenerator extends React.Component {

    shouldComponentUpdate(prevProps) {
        if (this.props.value !== prevProps.value ||
            this.props.name !== prevProps.name ||
            this.props.options !== prevProps.options ||
            this.props.error !== prevProps.error) {
            return true
        }
        return false
    }

    render() {
        let { ...props } = this.props
        switch (props.type) {
            case 'dropdownSelector':
                return <DropdownSelector
                    {...props} />
            case 'radioSelector':
                return <RadioSelector
                    {...props}
                />
            case 'multiSelector':
                return <MultiSelector
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