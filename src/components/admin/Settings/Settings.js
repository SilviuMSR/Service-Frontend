import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'

import * as SETTINGS from '../../../redux/actions/settings'
import * as NOTIFICATIONS from '../../../utils/notification'

import InputGenerator from '../../common/InputGenerator'

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

class Settings extends Component {

    initialFields = [
        { value: '', type: 'number', label: 'Months', name: 'months' }
    ]

    state = {
        settingsFields: this.initialFields,
        isStarted: true
    }

    componentDidMount() {
        // check start/stop
        this.getSettings()
    }

    onSave = () => {
        const noMonths = this.state.settingsFields[0].value
        const settingsJson = {
            months: noMonths
        }
        this.props.update(settingsJson).then(() => NOTIFICATIONS.success(this.props.language.toastr.edit))
        .catch(() => NOTIFICATIONS.error(this.props.language.toastr.editFail))
    }

    getSettings = () => {
        this.props.get().then(result => {
            const currentIndex = this.state.settingsFields.findIndex(index => index.name === "months")
            if (currentIndex > -1) {
                let stateCopy = this.state.settingsFields.map(field => ({ ...field }))
                stateCopy[currentIndex].value = result.months
                this.setState({ settingsFields: stateCopy })
            }
        })
    }

    startStopHandler = () => {
        if (this.state.isStarted) {
            this.props.stop()
            NOTIFICATIONS.success("Notifications are stopped!")
        }
        else {
            this.props.start()
            NOTIFICATIONS.success("Notifications started successfully!")
        }
        this.setState((prevState, props) => ({
            isStarted: !prevState.isStarted
        }));

    }

    onChangeHandler = event => {
        const currentIndex = this.state.settingsFields.findIndex(index => index.name === event.target.name)
        if (currentIndex > -1) {
            let stateCopy = this.state.settingsFields.map(field => ({ ...field }))
            stateCopy[currentIndex].value = event.target.value
            this.setState({ settingsFields: stateCopy })
        }
    }

    render() {
        return (
            <>
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>SETTINGS</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button onClick={() => this.startStopHandler()} color="primary">{this.state.isStarted ? 'STOP' : 'START'}</Button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#F8F8F8', margin: '20px 55px', flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <div style={{ flex: 1, padding: 8 }}>
                            {this.state.settingsFields.map((field, index) => {
                                return (
                                    <>
                                        <InputGenerator
                                            key={index}
                                            margin="dense"
                                            onChange={event => this.onChangeHandler(event)}
                                            {...field} />
                                    </>
                                )
                            })}
                        </div>
                        <div style={{ flex: 1, padding: 8 }}>
                            <Button onClick={() => this.onSave()} color="primary">Save changes</Button>
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
        start: () => dispatch(SETTINGS.startNotifications()),
        stop: () => dispatch(SETTINGS.stopNotifications()),
        update: settings => dispatch(SETTINGS.editSettings(settings)),
        get: () => dispatch(SETTINGS.getSettings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings))