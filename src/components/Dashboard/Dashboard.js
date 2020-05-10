import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'

import * as RESERVATIONS from '../../redux/actions/reservation'

import ReservationDash from './ReservationDash'
import CarDash from './CarDash'
import EmployeeDash from './EmployeeDash'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    containerContent: {
        height: 'calc(100% - 71px)',
        width: '100%'
    },
    headersContainer: {
        height: 70,
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 19,
        fontSize: 18,
        fontWeight: 500
    },
    headersContainerEmployee: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    titleText: {
        color: '#606771',
        fontWeight: 500
    },
    optionsContainer: {
        marginLeft: 'auto',
        paddingRight: 19
    }

})

class Dashboard extends Component {

    state = {
        renderPage: false,
        renderReservation: true,
        renderEmployee: false,
        renderCar: false
    }

    componentDidMount() {
        this.setState({
            renderPage: true
        })
    }

    resetRender = () => {
        this.setState({
            renderReservation: false,
            renderEmployee: false,
            renderCar: false
        })
    }

    setRenderOption = value => {
        this.resetRender()
        this.setState({
            [value]: true
        })
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.dashboard}</p>
                        </div>
                        <div className={this.props.classes.optionsContainer}>
                            <p className={this.props.classes.titleText}>
                                <Button onClick={() => this.setRenderOption('renderReservation')} color="secondary" style={{ marginRight: 8 }}>{this.props.language.buttons.reservationDash}</Button>
                                <Button onClick={() => this.setRenderOption('renderEmployee')} color="secondary" style={{ marginRight: 8 }}>{this.props.language.buttons.userDash}</Button>
                                <Button onClick={() => this.setRenderOption('renderCar')} color="secondary" style={{ marginRight: 8 }}>{this.props.language.buttons.carDash}</Button>
                            </p>
                        </div>
                    </div>
                    <div className={this.props.classes.containerContent}>
                        {this.state.renderEmployee && <EmployeeDash />}
                        {this.state.renderReservation && <ReservationDash />}
                        {this.state.renderCar && <CarDash />}
                    </div>
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login,
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))