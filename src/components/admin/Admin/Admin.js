import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import CarBrand from '../CarBrand/CarBrand'

class Admin extends Component {
    render() {
        const { match } = this.props
        return (
            <>
                <Route path={`${match.path}/car`} exact component={CarBrand} />
            </>
        )
    }
}
export default withRouter(Admin)