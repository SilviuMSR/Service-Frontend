import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'
import { AddCircleOutline as UploadIcon } from '@material-ui/icons'

import * as CONSTANTS from '../../../utils/constants'
import * as USERS from '../../../redux/actions/users'
import * as NOTIFICATIONS from '../../../utils/notification'

import InputGenerator from '../../common/InputGenerator'
import SimpleModal from '../../common/SimpleModal'

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
        height: 'calc(100% - 70px)',
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
        margin: '0px 10% 20px 10%',
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
        { type: 'text', label: 'New password', value: '', name: 'newPassword' },
        { type: 'text', label: 'Confirm Password', value: '', name: 'confirmPassword' }
    ]

    state = {
        vacantionFields: this.initialVacantion,
        passwordFields: this.initialPassword,
        vacantionRequest: false,
        changePass: false
    }

    onEditHandler = () => {
        this.props.edit(this.props.userId, {}).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.edit)
            this.onCancelHandler()
            this.props.getUsers()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failEdit))
    }

    onChangeHandler = event => {
        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            modalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ modalFields: modalFieldsCopy })
        }
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
                            onChange={event => this.onChangeHandler(event)}
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
                        onChange={event => this.onChangeHandler(event)}
                        {...field} />
                })
            }
        </div>)
    }

    render() {
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
                                <p style={{ margin: 0, padding: 0 }}>MANZUR SILVIU-RAUL</p>
                                <p className={this.props.classes.titleText}>EMAIL ADDRESS</p>
                                <p style={{ margin: 0, padding: 0 }}>address@ggg.com</p>
                                <p className={this.props.classes.titleText}>PHONE NUMBER</p>
                                <p style={{ margin: 0, padding: 0 }}>07267548772</p>
                                <p className={this.props.classes.titleText}>CURRENT STATUS</p>
                                <p style={{ margin: 0, padding: 0 }}>AVAILABLE</p>
                            </div>
                        </div>
                        <div className={this.props.classes.actions}>
                            <span className={this.props.classes.titleText}>{this.props.language.titles.actions}</span>
                            <Button onClick={() => this.setState((prevState) => ({ vacantionRequest: !prevState.vacantionRequest, changePass: false }))} className={this.props.classes.optionButton} color="secondary">ASK FOR VACANTION</Button>
                            {this.state.vacantionRequest &&
                                <div>
                                    {this.renderVacantionRequest()}
                                    <Button color="primary">SUBMIT REQUEST</Button>
                                </div>}
                            <Button onClick={() => this.setState((prevState) => ({ changePass: !prevState.changePass, vacantionRequest: false }))} className={this.props.classes.optionButton} color="secondary">CHANGE PASSWORD</Button>
                            {this.state.changePass &&
                                <div>
                                    {this.renderChangePass()}
                                    <Button color="primary">SUBMIT REQUEST</Button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        getUserById: userId => dispatch(USERS.getById(userId)),
        edit: (userId, user) => dispatch(USERS.edit(userId, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile))