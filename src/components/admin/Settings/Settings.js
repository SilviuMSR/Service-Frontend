import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { PlayArrow as PlayIcon, Stop as StopIcon, Check as AcceptIcon } from '@material-ui/icons'

import * as SETTINGS from '../../../redux/actions/settings'
import * as NOTIFICATIONS from '../../../utils/notification'
import * as CONSTANTS from '../../../utils/constants'

import InputGenerator from '../../common/InputGenerator'

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

class Settings extends Component {

    initialFields = [
        { value: '', type: 'number', label: this.props.language.labels.months, name: 'months' },
        { value: '', type: 'number', label: this.props.language.labels.checkTime, name: 'checkTime' },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.checkTimeType.checkTimeType, name: 'checkTimeType', options: CONSTANTS.CHECK_TIME_TYPE.map(field => ({ ...field, name: field.label, label: this.props.language.labels.checkTimeType[field.label] })) }
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
        const checkTime = this.state.settingsFields[1].value
        const checkTimeType = this.state.settingsFields[2].value
        const settingsJson = {
            months: noMonths,
            checkTime,
            checkTimeType
        }
        this.props.update(settingsJson).then(() => NOTIFICATIONS.success(this.props.language.toastr.edit))
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.editFail))
    }

    getSettings = () => {
        this.props.get().then(result => {
            const monthsIndex = this.state.settingsFields.findIndex(index => index.name === "months")
            const checkTimeIndex = this.state.settingsFields.findIndex(index => index.name === "checkTime")
            const checkTimeTypeIndex = this.state.settingsFields.findIndex(index => index.name === 'checkTimeType')
            if (monthsIndex > -1 && checkTimeIndex > -1) {
                let stateCopy = this.state.settingsFields.map(field => ({ ...field }))
                stateCopy[monthsIndex].value = result.settings.noMonths
                stateCopy[checkTimeIndex].value = result.settings.checkTime

                // Handle check time type received value
                stateCopy[checkTimeTypeIndex].value = this.props.language.labels.checkTimeType[result.settings.checkTimeType]
                stateCopy[checkTimeTypeIndex].options = stateCopy[checkTimeTypeIndex].options.map(op => ({
                    ...op, value: String(op.name) === String(result.settings.checkTimeType) ? true : false
                }))

                this.setState({ settingsFields: stateCopy })
            }
        })
    }

    startStopHandler = () => {
        if (this.state.isStarted) {
            this.props.stop()
            NOTIFICATIONS.success(this.props.language.toastr.notificationStopped)
        }
        else {
            this.props.start()
            NOTIFICATIONS.success(this.props.language.toastr.notificationStarted)
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
                            <p className={this.props.classes.titleText}>{this.props.language.titles.settings}</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button onClick={() => this.startStopHandler()} color="primary">{this.state.isStarted ? <StopIcon /> : <PlayIcon />}{this.state.isStarted ? this.props.language.buttons.stop : this.props.language.buttons.start}</Button>
                        </div>
                    </div>
                    <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column' }}>
                            {this.state.settingsFields.map((field, index) => {
                                return (
                                    <>
                                        <InputGenerator
                                            key={index}
                                            fullWidth={false}
                                            margin="dense"
                                            onChange={event => this.onChangeHandler(event)}
                                            {...field} />
                                    </>
                                )
                            })}
                        </div>
                        <div style={{ flex: 1, padding: 8 }}>
                            <Button onClick={() => this.onSave()} color="primary"><AcceptIcon />{this.props.language.buttons.save}</Button>
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