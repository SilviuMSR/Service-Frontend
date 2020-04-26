import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    }
})

class CarDash extends Component {

    state = {
        renderPage: false
    }

    componentDidMount() {
        this.setState({
            renderPage: true
        })
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    Car Dash
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login,
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarDash))