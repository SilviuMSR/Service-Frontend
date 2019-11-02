import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { connect } from 'react-redux'

import Login from '../components/Login/Login'

class Root extends Component {

    state = {
        renderPage: false
    }

    componentDidMount() {
        this.setState({ renderPage: true })
    }

    render() {
        if (this.state.renderPage) {
            return (<JssProvider>
                <Login />
            </JssProvider>)
        } else return null
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)