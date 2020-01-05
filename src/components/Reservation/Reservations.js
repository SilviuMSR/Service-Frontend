import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Paper } from '@material-ui/core'

import * as RESERVATIONS from '../../redux/actions/reservation'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow:'auto'
    },
    containerContent: {
        margin: 24,
        backgroundColor: 'red',
    }
})

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
            <div className={this.props.classes.container}>
                <div className={this.props.classes.containerContent}>
                    {this.state.reservations.map(res => {
                        return (
                            <div>
                                {res.clientName}
                            </div>
                        )
                    })}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reservations))