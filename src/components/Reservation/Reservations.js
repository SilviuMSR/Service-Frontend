import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import RenderItems from '../common/RenderExpandItem'
import SimpleModal from '../common/SimpleModal'

import * as RESERVATIONS from '../../redux/actions/reservation'
import * as CONSTANTS from '../../utils/constants'
import * as NOTIFICATION from '../../utils/notification'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    containerContent: {
        margin: '24px 100px 24px 100px'
    },
    headersContainer: {
        height: 30,
        width: 250,
        margin: '10px 100px 0px auto',
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'content-box'
    },
    options: {
        paddingRight: '10px',
        flex: 1,
        cursor: 'pointer'
    },
    optionsIcon: {
        paddingRight: '10px',
        paddingLeft: '10px',
        marginTop: '5px',
        color: '#9ea0a5'
    },
    optionText: {
        fontSize: 15,
        color: '#9ea0a5',
        fontWeight: 500
    },
    selectedOption: {
        color: '#1976d2'
    }
})

class Reservations extends Component {

    state = {
        reservations: [],
        renderPage: false,
        selectedOption: '',
        showFiles: false,
        reservationFiles: []
    }

    componentDidMount() {
        this.setState({ selectedOption: this.props.login.position === 'admin' ? CONSTANTS.RENDER_RESERVATION_ADMIN : CONSTANTS.RENDER_RESERVATION_EMPLOYEE }, () => this.handlerReservations())
    }

    getReservationById = reservationId => {
        this.props.getReservationById(reservationId).then(result => this.setState({ reservationFiles: result.file }))
    }

    handlerReservations = () => {
        if (this.props.login.position === 'admin') {
            this.getReservationsHandler()
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE) {
            this.getReservationsHandler({ employee: true })
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL) {
            this.getByEmployeeIdHandler(this.props.login.userId)
        }
    }

    getByEmployeeIdHandler = employeeId => {
        this.props.getByEmployeeId(employeeId).then(res => this.setState({ reservations: res.reservations, renderPage: true }))
    }

    getReservationsHandler = (options) => {
        this.props.getReservations(options).then(res => this.setState({ reservations: res.reservations, renderPage: true }))
    }

    generateReservationMessageHandler = status => {
        switch (status) {
            case CONSTANTS.RESERVATION_ACCEPTED:
                return NOTIFICATION.success("Reservation was successfully accepted!")
            case CONSTANTS.RESERVATION_DECLINED:
                return NOTIFICATION.error("Reservation was declined!")
            case CONSTANTS.RESERVATION_IN_PROGRESS:
                return NOTIFICATION.success("Reservation was added to your list!")
            case CONSTANTS.RESERVATION_DONE:
                return NOTIFICATION.success("Reservation was completed!")
        }
    }

    modifyStatusHandler = (reservationId, newStatus, userId) => {
        let newReservation = {
            userId: userId,
            reservationStatus: newStatus
        }

        this.props.modifyStatus(reservationId, newReservation).then(() => {
            this.generateReservationMessageHandler(newStatus)
            this.handlerReservations()
        })
    }

    selectOptionHandler = option => {
        this.setState({ selectedOption: option }, () => {
            this.handlerReservations()
        })
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    {this.props.login.position !== 'admin' ? <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.optionsIcon}><VisibilityOutlinedIcon /></div>
                        <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_EMPLOYEE)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>RESERVATIONS</span></div>
                        <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_PERSONAL)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>PERSONAL</span></div>
                    </div> : null}
                    <div className={this.props.classes.containerContent}>
                        <SimpleModal title={"Files"} open={this.state.showFiles && this.state.expandedReservationId} onCancel={() => this.setState({ showFiles: false })}>
                            {this.state.reservationFiles.length ? this.state.reservationFiles.map(file => {
                                return (
                                    <p>{file.originalName ? file.originalName : ""}</p>
                                )
                            }) : null}
                        </SimpleModal>
                        <RenderItems
                            onExpandHandler={reservationId => this.setState({ expandedReservationId: reservationId }, () => this.getReservationById(this.state.expandedReservationId))}
                            showFilesHandler={() => this.setState({ showFiles: true })}
                            generateInvoice={reservationId => {
                                this.props.generateInvoice(reservationId).then(() => this.handlerReservations())
                            }}
                            modifyStatus={this.modifyStatusHandler}
                            items={this.state.reservations}
                            renderType={this.state.selectedOption}
                        />
                    </div>
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {
        generateInvoice: reservationId => dispatch(RESERVATIONS.generateInvoice(reservationId)),
        getReservations: options => dispatch(RESERVATIONS.get(options)),
        getReservationById: reservationId => dispatch(RESERVATIONS.getById(reservationId)),
        getByEmployeeId: employeeId => dispatch(RESERVATIONS.getByEmployeeId(employeeId)),
        modifyStatus: (reservationId, newReservation) => dispatch(RESERVATIONS.edit(reservationId, newReservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reservations))