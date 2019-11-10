import React, { Component } from 'react'
import { connect } from 'react-redux'

class Reservations extends Component {

    componentWillMount() {

    }

  
    render() {
        return (
            <>
            This is reservation page
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

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)