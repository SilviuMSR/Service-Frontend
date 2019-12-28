import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { FormControl, TextField } from '@material-ui/core'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        spacing: 1,
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        spacing: 2
    },
    menu: {
        backgroundColor: 'white'
    }
})

class DropdownSelector extends React.Component {

    state = {
        value: ""
    }

    componentDidMount() {
        this.setState({ value: ""})
    }

    handleChange = event => {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event.target.value
            }
        })
        this.setState({ value: event.target.value })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        disabled={this.props.disabled}
                        label={this.props.label}
                        className={classes.textField}
                        value={this.props.value}
                        onChange={event => this.handleChange(event)}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            }
                        }}
                        margin="normal"
                        variant="outlined"
                    >
                        {this.props.options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.label || option.name}
                            </option>
                        ))}
                    </TextField>
                </FormControl>
            </div>
        );
    }
}


const mapStateToProps = reducers => ({
})

export default withStyles(styles)(connect(mapStateToProps)(DropdownSelector))