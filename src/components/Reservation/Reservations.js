import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core'

import RenderItems from '../common/RenderExpandItem'

import * as RESERVATIONS from '../../redux/actions/reservation'
import * as CONSTANTS from '../../utils/constants'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    containerContent: {
        margin: '24px 100px 24px 100px'
    }
})

class Reservations extends Component {

    state = {
        reservations: [],
        renderPage: false
    }

    componentDidMount() {
        this.getReservationsHandler()
    }

    getReservationsHandler = () => {
        this.props.getReservations().then(res => this.setState({ reservations: res.reservations, renderPage: true }))
    }

    modifyStatusHandler = (reservationId, newStatus) => {
        let newReservation = {
            reservationStatus: newStatus
        }

        this.props.modifyStatus(reservationId, newReservation).then(() => this.getReservationsHandler())
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.containerContent}>
                        <RenderItems
                            modifyStatus={this.modifyStatusHandler}
                            items={this.state.reservations}
                            renderType={CONSTANTS.RENDER_RESERVATION_ADMIN}
                        />
                    </div>
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        getReservations: () => dispatch(RESERVATIONS.get()),
        modifyStatus: (reservationId, newReservation) => dispatch(RESERVATIONS.edit(reservationId, newReservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reservations))