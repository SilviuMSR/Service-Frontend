import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import sha256 from 'sha256'
import { withRouter } from 'react-router'

import InputGenerator from '../common/InputGenerator'
import * as NOTIFICATION from '../../utils/notification'
import * as CONSTANTS from '../../utils/constants'
import * as LOGIN from '../../redux/actions/login'

import '../../styles/Login.css'

class Login extends Component {

    initialFields = [
        { value: '', type: 'text', label: 'Nume', name: 'username' },
        { value: '', type: 'password', label: 'Parola', name: 'password' }
    ]

    state = {
        modalFields: this.initialFields
    }

    componentDidMount() {
    }

    onChangeHandler = event => {

        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            modalFieldsCopy[currentIndex].value = event.target.value

            this.setState({ modalFields: modalFieldsCopy })
        }
    }

    onResetHandler = () => {
        this.setState({ modalFields: this.initialFields })
    }


    onSubmitHandler = () => {
        let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
        let usernameIndex = modalFieldsCopy.findIndex(idx => idx.name === 'username')
        let passwordIndex = modalFieldsCopy.findIndex(idx => idx.name === 'password')
        if (usernameIndex > -1 && passwordIndex > -1) {
            this.props.login(modalFieldsCopy[usernameIndex].value, sha256(modalFieldsCopy[passwordIndex].value))
                .catch(err => {
                    if (!err.response)
                        NOTIFICATION.error("Server down")
                    else
                        NOTIFICATION.error("Invalid Credentials")
                    this.onResetHandler()
                })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="fieldsContainer">
                    {this.state.modalFields.map((field, index) => {
                        return <InputGenerator
                            key={index}
                            margin="dense"
                            fullWidth={true}
                            onChange={event => this.onChangeHandler(event)}
                            {...field} />
                    })}
                    <div className="buttonsContainer">
                        <Button onClick={this.onSubmitHandler}>Login</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(LOGIN.login(username, password)),
        isLogged: () => dispatch(LOGIN.isLogged())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))