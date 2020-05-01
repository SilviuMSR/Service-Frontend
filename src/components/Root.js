import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
    AccountBox as ProfileIcon,
    Dashboard as DashboardIcon,
    Lock as AdminIcon,
    DirectionsCar as CarIcon,
    ErrorOutline as ProblemIcon,
    SupervisorAccount as UserIcon,
    Settings as SettingsIcon,
    EventSeat as ReservationIcon,
    Extension as StockIcon
} from '@material-ui/icons'

import * as LOGIN from '../redux/actions/login'

import Homepage from '../components/Homepage/Homepage'
import Dashboard from '../components/Dashboard/Dashboard'
import Reservations from '../components/Reservation/Reservations'
import RootSidebar from '../components/common/RootSidebar'
import Admin from '../components/admin/Admin/Admin'
import Stoc from '../components/Stoc/Stoc'
import UserProfile from '../components/admin/User/UserProfile'

class Root extends Component {

    state = {
        logged: false,
        renderPage: false,
        sidebarItems: [
            {
                icon: <ProfileIcon />,
                label: 'profile',
                requireAdmin: false,
                to: '/profile'
            },
            {
                icon: <AdminIcon />,
                requireAdmin: true,
                label: 'admin',
                nested: true,
                expandedText: 'admin',
                nestedComponents: [
                    {
                        icon: <CarIcon />,
                        to: '/admin/car',
                        label: 'car'
                    },
                    {
                        icon: <ProblemIcon />,
                        to: '/admin/problem',
                        label: 'problem'
                    },
                    {
                        icon: <UserIcon />,
                        to: '/admin/user',
                        label: 'user'
                    },
                    {
                        icon: <SettingsIcon />,
                        to: '/admin/settings',
                        label: 'settings'
                    }
                ]
            },
            {
                icon: <DashboardIcon />,
                label: 'dashboard',
                requireAdmin: true,
                to: '/'
            },
            {
                icon: <ReservationIcon />,
                label: 'reservation',
                requireAdmin: false,
                to: '/reservations'
            },
            {
                icon: <StockIcon />,
                requireAdmin: true,
                label: 'stoc',
                to: '/stoc'
            }
        ]
    }

    checkRights = () => this.props.login.position.toLowerCase() === 'admin' ? true : false

    computeSidebarItems = () => {
        if (!this.checkRights()) return this.state.sidebarItems.filter(item => !item.requireAdmin)
        return this.state.sidebarItems
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
                            <div style={{ display: 'flex', height: '100%' }}>
                                <RootSidebar
                                    onLogout={this.props.logout}
                                    items={this.computeSidebarItems()}
                                />
                                <div style={{ flex: 1, width: 'calc(100% - 300px)' }}>
                                    <Switch>
                                        {this.checkRights() && <Route path="/" exact component={Dashboard} />}
                                        {<Route path="/reservations" exact component={Reservations} />}
                                        {this.checkRights() && <Route path="/stoc" exact component={Stoc} />}
                                        {<Route path="/profile" exact component={UserProfile} />}
                                        {this.checkRights() && <Route path="/admin" component={Admin} />}
                                        {<Redirect to="/reservations" component={Reservations} />}
                                    </Switch>
                                </div>
                            </div>
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
        isLogged: () => dispatch(LOGIN.isLogged()),
        logout: () => dispatch(LOGIN.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)