import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as LOGIN from '../redux/actions/login'

import Homepage from '../components/Homepage/Homepage'
import Dashboard from '../components/Dashboard/Dashboard'
import Reservations from '../components/Reservation/Reservations'
import TopNavbar from '../components/common/TopNavbar'
import Stoc from '../components/Stoc/Stoc'

class Root extends Component {

    state = {
        logged: false,
        renderPage: false
    }

    componentDidMount() {
        this.props.isLogged()
            .then(() => {
                this.setState({ renderPage: true })
            })
            .catch(err => {
                this.setState({ renderPage: true })
            })
    }

    render() {
        if (this.state.renderPage) {
            return (<JssProvider>
                <Router>
                    {this.props.login.isLogged ?
                        (
                            <>
                                <div style={{ height: '10%' }}>
                                    <TopNavbar />
                                </div>
                                <div style={{ height: '90%' }}>
                                    <Switch>
                                        {<Route path="/reservations" exact component={Reservations} />}
                                        {<Route path="/stoc" exact component={Stoc} />}
                                        {<Route path="/" component={Dashboard} />}
                                    </Switch>
                                </div>
                            </>
                        )
                        : <Homepage />
                    }
                </Router>
            </JssProvider>)
        } else return null
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {
        isLogged: () => dispatch(LOGIN.isLogged())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)