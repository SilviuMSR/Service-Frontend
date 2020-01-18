import React from 'react'
import { withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../utils/constants'

import ReservationAdmin from '../Reservation/RenderReservations/AdminReseravtion'
import ReservationEmployee from '../Reservation/RenderReservations/EmployeeReservation'
import ReservationPersonal from '../Reservation/RenderReservations/PersonalReservation'

const styles = theme => ({
    panelContainer: {
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white'
    }
})


class RenderExpandItem extends React.Component {

    render() {
        let { classes } = this.props

        return (
            <>
                <div className={classes.panelContainer}>
                    {this.props.items.map((item, index) => {
                        switch (this.props.renderType) {
                            case CONSTANTS.RENDER_RESERVATION_ADMIN:
                                return <ReservationAdmin
                                    key={index}
                                    onExpandHandler={reservationId => this.props.onExpandHandler(reservationId)}
                                    showFilesHandler={this.props.showFilesHandler}
                                    generateInvoice={reservationId => this.props.generateInvoice(reservationId)}
                                    modifyStatus={this.props.modifyStatus}
                                    reservation={item} />
                            case CONSTANTS.RENDER_RESERVATION_EMPLOYEE:
                                return <ReservationEmployee
                                    key={index}
                                    reservation={item}
                                    modifyStatus={this.props.modifyStatus}
                                />
                            case CONSTANTS.RENDER_RESERVATION_PERSONAL:
                                return <ReservationPersonal
                                    key={index}
                                    reservation={item}
                                    modifyStatus={this.props.modifyStatus} />
                        }
                    })}
                </div>
            </>
        )
    }
}

export default withStyles(styles)(RenderExpandItem)