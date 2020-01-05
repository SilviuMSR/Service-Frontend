import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
        height: 80,
        paddingBottom: 8
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    formGroup: {
        display: 'inline'
    },
    radioGroup: {
        flexDirection: 'row'
    }
});

class RadioSelector extends React.Component {

    handleChange = event => {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: event.target.value
            }
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{this.props.label}</FormLabel>
                    <RadioGroup className={classes.radioGroup} aria-label="gender" name="gender1" value={this.props.value} onChange={event => this.handleChange(event)}>
                        {this.props.options.map(op => {
                            return (
                                <FormControlLabel value={op.label} control={<Radio />} label={op.label} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}


const mapStateToProps = reducers => ({
})

export default withStyles(styles)(connect(mapStateToProps)(RadioSelector))