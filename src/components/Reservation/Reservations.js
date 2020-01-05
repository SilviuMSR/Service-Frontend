import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as RESERVATIONS from '../../redux/actions/reservation'

class Reservations extends Component {

    state = {
        reservations: []
    }

    componentDidMount() {
        this.getReservationsHandler()
    }

    getReservationsHandler = () => {
        this.props.getReservations().then(res => this.setState({ reservations: res.reservations }))
    }

    render() {
        return (
            <>
                {this.state.reservations.map(res => {
                    return (
                        <div>
                            {res.clientName}
                        </div>
                    )
                })}
            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        getReservations: () => dispatch(RESERVATIONS.get())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)