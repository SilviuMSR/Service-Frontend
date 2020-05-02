import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles, Button, TextField } from '@material-ui/core'
import { DoneOutline, Cancel } from '@material-ui/icons'

import RenderCards from '../common/RenderCards'

import * as VACATIONS from '../../redux/actions/vacationRequest'
import * as CONSTANTS from '../../utils/constants'
import * as NOTIFICATIONS from '../../utils/notification'

const styles = theme => ({
    container: {
        width: '100%',
        height: 'calc(100% - 42px)'
    },
    containerContent: {
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

class Vacations extends Component {

    state = {
        vacations: [],
        searchInput: ''
    }

    componentDidMount() {
        this.getVacations()
    }

    getVacations = () => {
        this.props.getVacations({
            name: this.state.searchInput,
            employee: this.props.login.position.toLowerCase() === 'employee' ? this.props.login.userId : null
        }).then(result => {
            this.setState({
                vacations: result.vacationRequests.map(vacation => ({
                    ...vacation,
                    from: moment(vacation.from).format(CONSTANTS.DEFAULT_DATE_FORMAT),
                    to: moment(vacation.to).format(CONSTANTS.DEFAULT_DATE_FORMAT)
                }))
            })
        })
    }

    requestHandler = (item, action) => {

        if (item.requestStatus !== CONSTANTS.VACATION_PENDING) return NOTIFICATIONS.error(this.props.language.toastr.alreadyAsked)

        let vacationStatus = CONSTANTS.VACATION_PENDING
        if (action === 'accepted') vacationStatus = CONSTANTS.VACATION_ACCEPTED
        else if (action === 'declined') vacationStatus = CONSTANTS.VACATION_DECLINED

        this.props.update(item._id, { ...item, requestStatus: vacationStatus }).then(() => {
            this.getVacations()
            NOTIFICATIONS.success(this.props.language.toastr.successAsk)
        })
            .catch(err => NOTIFICATIONS.error(this.props.language.toastr.failAsk))
    }

    render() {
        return (
            <>
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.vacations}</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <div className={this.props.classes.searchContainer}>
                                <TextField onChange={event => this.setState({ searchInput: event.target.value }, this.getVacations)} placeholder={this.props.language.utils.search} />
                            </div>
                        </div>
                    </div>
                    {this.state.vacations && this.state.vacations.length ? <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards

                            displayOptions={true}
                            displayMainPhoto={true}
                            type={CONSTANTS.BRAND_TYPE}
                            actions={
                                this.props.login.position.toLowerCase() === 'employee' ?
                                    []
                                    :
                                    [
                                        {
                                            icon: <DoneOutline style={{ color: '#4caf50' }} />,
                                            label: 'Accept',
                                            action: item => {
                                                this.requestHandler(item, 'accepted')
                                            }
                                        },
                                        {
                                            icon: <Cancel style={{ color: '#d32f2f' }} />,
                                            label: 'Decline',
                                            action: item => {
                                                this.requestHandler(item, 'declined')
                                            }
                                        }
                                    ]
                            }
                            onClick={item => { }}
                            content={[
                                {
                                    title: 'General details',
                                    childrens: [
                                        { field: 'username', populate: 'userId', label: 'Requester' },
                                        { field: 'from', label: 'From' },
                                        { field: 'to', label: 'To' },
                                        { field: 'reason', label: 'Reason' },
                                        { field: 'requestStatus', label: 'Status' }
                                    ]
                                }]}
                            items={this.state.vacations} />
                    </div> : <h4 style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noResult}</h4>}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n,
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {
        getVacations: (options) => dispatch(VACATIONS.get(options)),
        update: (id, newVacation) => dispatch(VACATIONS.edit(id, newVacation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Vacations))