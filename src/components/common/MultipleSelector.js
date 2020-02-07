import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: 0
    },
    formGroup: {
        display: 'inline'
    },
    fromHelper: {
        marginLeft: '-8px',
        fontSize: 12
    }
});

class CheckboxesGroup extends React.Component {

    parseChange = ({ id, price, name, value, label }) => {
        let valueCopy = [...this.props.value].map(obj => ({ ...obj }))
        let nameIndex = valueCopy.findIndex(value => value.name === name)
        if (nameIndex > -1) {
            valueCopy[nameIndex] = {
                name,
                value,
                label,
                id,
                price
            }
        }

        this.props.onChange({
            target: {
                name: this.props.name,
                value: valueCopy,
                label
            }
        })

    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormHelperText className={classes.fromHelper}>{this.props.utils.toUpperCase()}</FormHelperText>
                    <FormGroup className={classes.formGroup}>
                        {this.props.value.map(util => {
                            return <FormControlLabel
                                key={util.name}
                                control={
                                    <Checkbox name={util.name} checked={util.value || false} onChange={event => this.parseChange({ id: util.id, price: util.price ? util.price : null, name: util.name, value: event.target.checked, label: util.label })} value={util.name} />
                                }
                                label={util.label || util.name} />
                        })}
                    </FormGroup>
                </FormControl>
            </div>
        );
    }
}

CheckboxesGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    utils: PropTypes.string.isRequired
}


const mapStateToProps = reducers => ({
})

export default withStyles(styles)(connect(mapStateToProps)(CheckboxesGroup))