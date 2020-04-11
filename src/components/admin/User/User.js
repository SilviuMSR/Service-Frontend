import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'

import * as CONSTANTS from '../../../utils/constants'
import * as USERS from '../../../redux/actions/users'

import UserModal from './UserModal'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    headersContainer: {
        height: 50,
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 19
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 19,
        fontSize: 18,
        fontWeight: 500
    },
    titleText: {
        color: '#1976d2'
    },
    searchContainer: {
        paddingLeft: 18,
        paddingTop: 7
    }
})

class User extends Component {

    userToEdit = {}
    userToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        users: [],
        openConfirmationModal: false
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        this.props.getUsers().then(result => {
            this.setState({
                users: result.users
            })
        })
    }

    deleteUserHandler = () => {
        this.props.delete(this.userToDelete._id).then(() => {
            this.getUsers()
            this.setState({ openConfirmationModal: false })
        })
    }

    closeConfirmationModalHandler = () => {
        this.userToDelete = {}
        this.setState({ openConfirmationModal: false })
    }

    render() {
        return (
            <>
                <ConfirmationModal
                    text={this.props.language.utils.delete}
                    cancelButtonText={this.props.language.buttons.cancel}
                    acceptButtonText={this.props.language.buttons.delete}
                    open={this.state.openConfirmationModal}
                    onClose={this.closeConfirmationModalHandler}
                    onCancel={this.closeConfirmationModalHandler}
                    onAccept={() => this.deleteUserHandler()} />
                <UserModal userId={this.userToEdit._id} type={this.state.modalType} getUsers={() => this.getUsers()} open={this.state.openModal} onCancel={() => {
                    this.getUsers()
                    this.setState({ openModal: false })
                }} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>USERS</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button>
                            <div className={this.props.classes.searchContainer}>
                                <TextField placeholder={this.props.language.utils.search} />
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#F8F8F8', margin: '20px 55px', flex: 1, border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            displayMainPhoto={false}
                            onEdit={item => {
                                this.userToEdit = item
                                this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                            }}
                            onDelete={item => {
                                this.userToDelete = item
                                this.setState({ openConfirmationModal: true })
                            }}
                            onClick={item => { }}
                            content={[{ field: 'username', label: this.props.language.labels.name }, { field: 'position', label: this.props.language.labels.position }, { field: 'userStatus', label: this.props.language.labels.status }]}
                            items={this.state.users} />
                    </div>
                </div>

            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(USERS.get()),
        delete: userId => dispatch(USERS.del(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User))