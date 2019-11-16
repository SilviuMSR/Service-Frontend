import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Homepage from '../components/Homepage/Homepage'
import Dashboard from '../components/Dashboard/Dashboard'
import Reservations from '../components/Reservation/Reservations'
import TopNavbar from '../components/common/TopNavbar'

class Root extends Component {

    state = {
        logged: true,
        renderPage: false
    }

    componentDidMount() {
        this.setState({ renderPage: true })
    }

    render() {
        if (this.state.renderPage) {
            return (<JssProvider>
                <Router>
                    {this.state.logged ?
                        (
                            <>
                                <div style={{ height: '10%' }}>
                                    <TopNavbar />
                                </div>
                                <div style={{ height: '90%'}}>
                                    <Switch>
                                        {<Route path="/reservations" exact component={Reservations} />}
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
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)