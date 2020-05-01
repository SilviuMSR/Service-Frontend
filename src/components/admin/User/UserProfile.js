import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'
import { AddCircleOutline as UploadIcon } from '@material-ui/icons'

import * as VACANTION from '../../../redux/actions/vacationRequest'
import * as USERS from '../../../redux/actions/users'
import * as NOTIFICATIONS from '../../../utils/notification'

import InputGenerator from '../../common/InputGenerator'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    headersContainer: {
        minHeight: 70,
        maxHeight: 70
    },
    profileContainer: {
        height: 'calc(100% - 120px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    profilePhotoContainer: {
        minHeight: 120,
        maxHeight: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 1
    },
    photo: {
        display: 'flex'
    },
    photoImg: {
        borderRadius: '50%',
        height: 240,
    },
    profileContent: {
        height: '100%',
        margin: '0px 20% 20px 20%',
        padding: '15% 25px 25px 25px',
        backgroundColor: '#F8F8F8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: '1px solid rgba(0,0,0,0.1)'
    },
    uploadIcon: {
        fontSize: 33,
        position: 'relative',
        top: 20,
        right: 50,
        color: 'rgba(0,0,0,0.4)',
        cursor: 'pointer'
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    actions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleText: {
        color: '#606771',
        fontWeight: 500,
        fontSize: 18
    },
    optionButton: {
        margin: 10
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
})

class UserProfile extends Component {


    initialVacantion = [
        { type: 'date', label: 'From Date', value: '', name: 'from' },
        { type: 'date', label: 'To Date', value: '', name: 'to' },
        { type: 'text', label: 'Reason', value: '', name: 'reason' }
    ]

    initialPassword = [
        { type: 'password', label: 'New password', value: '', name: 'newPassword' },
        { type: 'password', label: 'Confirm Password', value: '', name: 'confirmPassword' }
    ]

    state = {
        vacantionFields: this.initialVacantion,
        passwordFields: this.initialPassword,
        vacantionRequest: false,
        changePass: false,
        currentUser: null
    }

    resetFields = () => {
        this.setState({
            vacantionFields: this.initialVacantion,
            passwordFields: this.initialPassword,
            vacationRequest: false,
            changePass: false
        })
    }

    componentDidMount() {
        this.props.getUserById(this.props.login.userId).then(result => {
            this.setState({ currentUser: result })
        })
    }

    onChangePassHandler = event => {
        let currentIndex = this.state.passwordFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.passwordFields].map(field => ({ ...field }))
            modalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ passwordFields: modalFieldsCopy })
        }
    }

    onChangeVacantionHandler = event => {
        let currentIndex = this.state.vacantionFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.vacantionFields].map(field => ({ ...field }))
            modalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ vacantionFields: modalFieldsCopy })
        }
    }

    submitChangePassword = () => {
        const newPassJson = {}
        this.state.passwordFields.forEach(field => {
            newPassJson[field.name] = field.value
        })

        if (newPassJson['newPassword'].toLowerCase() !== newPassJson['confirmPassword'].toLowerCase()) return NOTIFICATIONS.error(this.props.language.toastr.passMatch)

        this.props.updateUser(this.state.currentUser._id, { password: newPassJson['newPassword'] }).then(() => {
            this.resetFields()
            return NOTIFICATIONS.success(this.props.language.toastr.edit)
        })
    }

    submitAskForVacation = () => {
        const stateJson = {}
        this.state.vacantionFields.forEach(field => {
            stateJson[field.name] = field.value
        })

        const vacationRequest = {}

        vacationRequest.userId = this.props.login.userId
        Object.keys(stateJson).forEach(key => {
            vacationRequest[key] = stateJson[key]
        })

        this.props.createVacation(vacationRequest).then(() => {
            this.resetFields()
            return NOTIFICATIONS.success(this.props.language.toastr.add)
        })
    }

    renderChangePass = () => {
        return (
            <div className={this.props.classes.fieldsContainer}>
                {
                    this.state.passwordFields.map((field, index) => {
                        return <InputGenerator
                            InputLabelProps={{
                                shrink: true
                            }}
                            key={index}
                            margin="dense"
                            fullWidth={false}
                            onChange={event => this.onChangePassHandler(event)}
                            {...field} />
                    })
                }
            </div>)
    }

    renderVacantionRequest = () => {
        return (<div className={this.props.classes.fieldsContainer}>
            {
                this.state.vacantionFields.map((field, index) => {
                    return <InputGenerator
                        InputLabelProps={{
                            shrink: true
                        }}
                        key={index}
                        margin="dense"
                        fullWidth={false}
                        onChange={event => this.onChangeVacantionHandler(event)}
                        {...field} />
                })
            }
        </div>)
    }

    render() {
        if (this.state.currentUser) {
            return (
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}></div>
                    <div className={this.props.classes.profileContainer}>
                        <div className={this.props.classes.profilePhotoContainer}>
                            <div className={this.props.classes.photo}>
                                <img className={this.props.classes.photoImg} src={"/assets/profileIcon.jpeg" || "https://via.placeholder.com/250"} />
                                <UploadIcon className={this.props.classes.uploadIcon} />
                            </div>
                        </div>
                        <div className={this.props.classes.profileContent}>
                            <div className={this.props.classes.details}>
                                <span className={this.props.classes.titleText}>{this.props.language.titles.userDetails}</span>
                                <div style={{ textAlign: 'center' }}>
                                    <p className={this.props.classes.titleText}>FULLNAME</p>
                                    <p style={{ margin: 0, padding: 0 }}>{this.state.currentUser.username || '-'}</p>
                                    <p className={this.props.classes.titleText}>EMAIL ADDRESS</p>
                                    <p style={{ margin: 0, padding: 0 }}>{this.state.currentUser.email || '-'}</p>
                                    <p className={this.props.classes.titleText}>PHONE NUMBER</p>
                                    <p style={{ margin: 0, padding: 0 }}>{this.state.currentUser.phoneNumber || '-'}</p>
                                    <p className={this.props.classes.titleText}>CURRENT STATUS</p>
                                    <p style={{ margin: 0, padding: 0 }}>{this.state.currentUser.userStatus || '-'}</p>
                                </div>
                            </div>
                            <div className={this.props.classes.actions}>
                                <span className={this.props.classes.titleText}>{this.props.language.titles.actions}</span>
                                <Button onClick={() => this.setState((prevState) => ({ vacantionRequest: !prevState.vacantionRequest, changePass: false }))} className={this.props.classes.optionButton} color="secondary">ASK FOR VACANTION</Button>
                                {this.state.vacantionRequest &&
                                    <div>
                                        {this.renderVacantionRequest()}
                                        <Button onClick={() => this.submitAskForVacation()} color="primary">{this.props.language.buttons.submit}</Button>
                                    </div>}
                                <Button onClick={() => {
                                    this.setState((prevState) => ({ changePass: !prevState.changePass, vacantionRequest: false }))
                                }} className={this.props.classes.optionButton} color="secondary">CHANGE PASSWORD</Button>
                                {this.state.changePass &&
                                    <div>
                                        {this.renderChangePass()}
                                        <Button onClick={() => this.submitChangePassword()} color="primary">{this.props.language.buttons.submit}</Button>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else return null
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n,
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {
        getUserById: userId => dispatch(USERS.getById(userId)),
        updateUser: (userId, newPass) => dispatch(USERS.edit(userId, newPass)),
        edit: (userId, user) => dispatch(USERS.edit(userId, user)),
        createVacation: vacation => dispatch(VACANTION.create(vacation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile))