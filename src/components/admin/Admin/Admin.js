import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import CarBrand from '../CarBrand/CarBrand'
import CarProblem from '../CarProblem/CarProblem'
import User from '../User/User'

class Admin extends Component {
    render() {
        const { match } = this.props
        return (
            <>
                <Route path={`${match.path}/car`} exact component={CarBrand} />
                <Route path={`${match.path}/problem`} exact component={CarProblem} />
                <Route path={`${match.path}/user`} exact component={User} />
            </>
        )
    }
}
export default withRouter(Admin)