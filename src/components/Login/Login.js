import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateReservation from './CreateReservation'

class Login extends Component {

    state = {
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <CreateReservation />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)