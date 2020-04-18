import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'

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
    containerContent: {
        margin: '24px 100px 24px 100px'
    },
    headersContainer: {
        height: 50,
        width: 300,
        margin: '10px 100px 0px auto',
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'content-box'
    },
    addContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    searchContainer: {
        flex: 3,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    problemDetails: {
        flex: 1,
        alignItems: 'center',
        padding: 16
    },
    stepsContainer: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 16
    },
    stepsContainerHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    marginLeftAuto: {
        marginLeft: 'auto'
    },
    stepsTitle: {
        fontSize: 18,
        fontWeight: 500
    },
    steps: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    currentSteps: {
        flex: 2
    },
    newStep: {
        flex: 1
    }
})

class UserModal extends Component {

    initialFields = [
        { value: '', type: 'text', label: this.props.language.labels.username, name: 'username' },
        { value: '', type: 'password', label: this.props.language.labels.password, name: 'password' },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.position, name: 'position', options: CONSTANTS.USER_POSITION },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.status, name: 'userStatus', options: CONSTANTS.USER_STATUS }
    ]

    state = {
        modalFields: this.initialFields
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.type === CONSTANTS.EDIT) this.toggleEditModal(nextProps.userId)
    }

    toggleEditModal = userId => {
        this.props.getUserById(userId).then(response => {
            let modalFieldsCopy = [...this.state.modalFields].map(field => {
                if (field.type === 'dropdownSelector') {
                    return ({
                        ...field,
                        value: response[field.name],
                        options: field.options.map(option => {
                            return ({ ...option, value: String(option.id) === String(response[field.name]) ? true : false })
                        }),
                        touched: true
                    })
                }

                return ({
                    ...field,
                    value: response[field.name]
                })
            })

            this.setState({
                modalFields: modalFieldsCopy
            })
        }).catch(() => {
            NOTIFICATIONS.error(this.props.language.toastr.notFound)
        })
    }

    createUserJson = () => {
        let userJson = {}

        this.state.modalFields.forEach(field => {
            userJson[field.name] = field.value
        })

        return userJson
    }

    onAddHandler = () => {
        this.props.createUser(this.createUserJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.add)
            this.onCancelHandler()
            this.props.getUsers()
        })
        .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failAdd))
    }

    onEditHandler = () => {
        this.props.edit(this.props.userId, this.createUserJson()).then(() => {
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


    renderUserFields = () => {
        return (<div className={this.props.classes.modalContainer}>
            <div className={this.props.classes.problemDetails}>
                {
                    this.state.modalFields.map((field, index) => {
                        return <InputGenerator
                            key={index}
                            margin="dense"
                            fullWidth={true}
                            onChange={event => this.onChangeHandler(event)}
                            {...field} />
                    })
                }
            </div>
        </div>)
    }

    onCancelHandler = () => {
        this.props.onCancel()
        this.setState({
            modalFields: this.initialFields
        })
    }

    render() {
        return (
            <>
                <SimpleModal
                    acceptButtonText={this.props.language.buttons.save}
                    cancelButtonText={this.props.language.buttons.cancel}
                    onAccept={this.props.type === CONSTANTS.CREATE ? this.onAddHandler : this.onEditHandler}
                    maxWidth={"md"}
                    title={this.props.type === CONSTANTS.CREATE ? this.props.language.titles.addUser : this.props.language.titles.editUser}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderUserFields()}
                </SimpleModal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        createUser: user => dispatch(USERS.create(user)),
        getUserById: userId => dispatch(USERS.getById(userId)),
        edit: (userId, user) => dispatch(USERS.edit(userId, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserModal))