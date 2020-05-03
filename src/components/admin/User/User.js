import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { AddCircleOutline as AddIcon, Edit, Delete } from '@material-ui/icons'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'

import * as CONSTANTS from '../../../utils/constants'
import * as USERS from '../../../redux/actions/users'
import * as NOTIFICATIONS from '../../../utils/notification'

import UserModal from './UserModal'

const styles = theme => ({
    container: {
        width: '100%',
        height: 'calc(100% - 72px)'
    },
    headersContainer: {
        height: 70,
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
        color: '#606771',
        fontWeight: 500
    },
    searchContainer: {
        paddingLeft: 18,
        paddingTop: 7
    },
    addIcon: {
        paddingRight: 6,
        fontSize: 21
    }
})

class User extends Component {

    userToEdit = {}
    userToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        users: [],
        openConfirmationModal: false,
        searchInput: '',
        from: 0,
        limit: 10,
        itemsPerPage: 10,
        count: 0
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        this.props.getUsers({
            name: this.state.searchInput,
            from: this.state.from,
            limit: this.state.limit,
        }).then(result => {
            this.setState({
                count: result.count,
                users: result.users
            })
        })
    }

    deleteUserHandler = () => {
        this.props.delete(this.userToDelete._id).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.delete)
            this.getUsers()
            this.setState({ openConfirmationModal: false })
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failDelete))
    }

    closeConfirmationModalHandler = () => {
        this.userToDelete = {}
        this.setState({ openConfirmationModal: false })
    }


    changePageHandler = option => {
        if (option === 'next') {
            const newFrom = this.state.from + this.state.itemsPerPage
            this.setState({ from: newFrom }, this.getUsers)
        }

        if (option === 'prev') {
            const newFrom = this.state.from - this.state.itemsPerPage
            this.setState({ from: newFrom }, this.getUsers)
        }
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
                            <p className={this.props.classes.titleText}>{this.props.language.titles.users}</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}><AddIcon className={this.props.classes.addIcon} />{this.props.language.buttons.add}</Button>
                            <div className={this.props.classes.searchContainer}>
                                <TextField onChange={event => this.setState({ searchInput: event.target.value }, this.getUsers)} placeholder={this.props.language.utils.search} />
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            displayOptions={true}
                            displayMainPhoto={true}
                            actions={
                                [
                                    {
                                        icon: <Edit />,
                                        label: 'Edit',
                                        action: item => {
                                            this.userToEdit = item
                                            this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                        }
                                    },
                                    {
                                        icon: <Delete />,
                                        label: 'Delete',
                                        action: item => {
                                            this.userToDelete = item
                                            this.setState({ openConfirmationModal: true })
                                        }
                                    }
                                ]
                            }
                            onClick={item => { }}
                            content={[
                                {
                                    title: 'General details',
                                    childrens: [{ field: 'username', label: this.props.language.labels.name },
                                    { field: 'position', label: this.props.language.labels.position },
                                    { field: 'userStatus', label: this.props.language.labels.status }
                                    ]
                                }
                            ]}
                            items={this.state.users} />
                        <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                            <Button disabled={this.state.from === 0 ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('prev')}>{this.props.language.buttons.prev}</Button>
                            <Button disabled={this.state.count < this.state.itemsPerPage ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('next')}>{this.props.language.buttons.next}</Button>
                        </div>
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
        getUsers: (options) => dispatch(USERS.get(options)),
        delete: userId => dispatch(USERS.del(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User))