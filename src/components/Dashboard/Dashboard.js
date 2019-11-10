import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {

    componentWillMount() {

    }

  
    render() {
        return (
            <>
            This is dashboard
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)