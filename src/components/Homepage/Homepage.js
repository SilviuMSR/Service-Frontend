import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../utils/constants'

import CreateReservation from '../Reservation/CreateReservation'
import Login from '../Login/Login'

import '../../styles/Homepage.css'

const styles = () => ({
    optionButton: {

    },
    equalFlex: {
        flex: 1
    },
    selectedOption: {
        backgroundColor: '#ccc'
    }
})

class Homepage extends Component {

    state = {
        options: CONSTANTS.HOMEPAGE_OPTIONS,
        activeOption: CONSTANTS.HOMEPAGE_OPTIONS[0].name
    }

    componentDidMount() {
    }

    selectedOptionHandler = option => {
        let selectedOptionIndex = this.state.options.findIndex(idx => idx.name === option.name)

        if (selectedOptionIndex > -1) {
            let optionsCopy = [...this.state.options].map(option => ({ ...option }))
            optionsCopy = optionsCopy.map(option => ({ ...option, value: false }))
            optionsCopy[selectedOptionIndex].value = true

            this.setState({ options: optionsCopy, activeOption: optionsCopy[selectedOptionIndex].name })
        }
    }

    render() {

        const { classes } = this.props

        return (
            <>
                <div className="container">
                    <div className="modalContainer">
                        <div className="titleContainer">
                            <p>Here will be application name!</p>
                        </div>
                        <div className="optionsContainer">
                            {this.state.options.map(option => {
                                return (
                                    <Button onClick={() => this.selectedOptionHandler(option)} className={`${classes.equalFlex} ${classes.optionButton} ${option.value ? classes.selectedOption : ""}`}>{option.name}</Button>
                                )
                            })}
                        </div>
                        {this.state.activeOption.toLowerCase() === CONSTANTS.HOMEPAGE_OPTIONS[0].name.toLowerCase() ?
                            <CreateReservation /> : <Login />
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Homepage))