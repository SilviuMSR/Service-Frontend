import React from 'react'
import { connect } from 'react-redux'
import { withStyles, Avatar, Button } from '@material-ui/core'
import moment from 'moment'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as CONSTANTS from '../../../utils/constants'

const styles = theme => ({
    panelContainer: {
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white'
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '18%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 12,
        color: '#9ea0a5',
        fontWeight: 500
    },
    subtitleText: {
        color: '#3e3f42',
        fontWeight: 'normal',
        fontSize: 14
    },
    expandedContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    expandedContainerItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    expandedContainerItemLast: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    clientDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 6
    },
    problemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        cursor: 'pointer',
        paddingTop: 6
    },
    workOnClick: {
        cursor: 'pointer'
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    ovalRed: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'red',
        marginRight: 10,
        marginTop: 3
    },
    ovalGreen: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'green',
        marginRight: 10,
        marginTop: 3
    },
    ovalPanding: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'yellow',
        marginRight: 10,
        marginTop: 3
    },
    ovalProgress: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'purple',
        marginRight: 10,
        marginTop: 3
    },
    ovalDone: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4d7549',
        marginRight: 10,
        marginTop: 3
    },
    acceptIcon: {
        color: 'green',
        cursor: 'pointer',
        border: '1px solid',
        '&:hover': {
            backgroundColor: 'green',
            color: 'white'
        }
    },
    declineIcon: {
        color: 'red',
        cursor: 'pointer',
        border: '1px solid',
        marginLeft: 5,
        '&:hover': {
            backgroundColor: '#ff726f',
            color: 'white'
        }
    },
    optionsContainer: {
        textAlign: 'center',
        paddingTop: 6
    },
    options: {
        display: 'flex',
        flexDirection: 'column'
    }
})


class AdminReservation extends React.Component {

    renderMiddleSectionHandler = () => {
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.titleText}>{this.props.language.utils.reservationWait}</span>
                <div className={this.props.classes.optionsContainer}>
        <Button onClick={() => this.props.modifyStatus(this.props.reservation._id, CONSTANTS.RESERVATION_ACCEPTED)} className={this.props.classes.acceptIcon}>{this.props.language.buttons.accept}</Button>
        <Button onClick={() => this.props.modifyStatus(this.props.reservation._id, CONSTANTS.RESERVATION_DECLINED)} className={this.props.classes.declineIcon}>{this.props.language.buttons.decline}</Button>
                </div>
            </div>
        )

        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_DONE) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.titleText}>{this.props.language.utils.reservationDone}</span>
                <div className={this.props.classes.optionsContainer}>
                    {!this.props.reservation.file.length ? <Button onClick={() => this.props.generateInvoice(this.props.reservation._id)}>GENERATE DOCUMENTS</Button> :
                        <>
                            <Button onClick={this.props.showFilesHandler}>{this.props.language.buttons.files}</Button>
                        </>}
                </div>
            </div>
        )

        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_IN_PROGRESS) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.titleText}>{this.props.language.utils.progress}</span>
                <div className={this.props.classes.optionsContainer}>
                    <span className={this.props.classes.subtitleText}>{this.props.reservation.userId.username.charAt(0).toUpperCase() + this.props.reservation.userId.username.slice(1)} works at this car.</span>
                </div>
            </div>
        )

        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_DECLINED) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.titleText}>{this.props.language.utils.reservationDecline}</span>
            </div>
        )

        return null
    }

    renderStatusHandler = () => {
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalPanding} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_PANDING}</span>
            </div>
        )
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_ACCEPTED) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalGreen} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_ACCEPTED}</span>
            </div>
        )
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_DECLINED) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalRed} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_DECLINED}</span>
            </div>
        )
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_IN_PROGRESS) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalProgress} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_IN_PROGRESS}</span>
            </div>
        )
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_DONE) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalDone} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_DONE}</span>
            </div>
        )

        return <span>-</span>
    }

    render() {
        let { classes } = this.props
        return (
            <ExpansionPanel onChange={() => this.props.onExpandHandler(this.props.reservation._id)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                        </div>
                    </div>

                    <div className={classes.heading}>
                        <div className={classes.titleContainer}>
        <span className={classes.titleText}>{this.props.language.titles.brands} / {this.props.language.titles.models}</span>
                            <span className={classes.subtitleText}>{this.props.reservation.carBrandId.name} {this.props.reservation.carModelId.name}</span>
                        </div>
                    </div>
                    <div className={classes.heading}>
                        <div className={classes.titleContainer}>
        <span className={classes.titleText}>{this.props.language.labels.price.toUpperCase()}</span>
                            <span className={classes.subtitleText}>{this.props.reservation.price ? `${this.props.reservation.price} RON` : '-'}</span>
                        </div>
                    </div>
                    <div className={classes.heading}>
                        <div className={classes.titleContainer}>
        <span className={classes.titleText}>{this.props.language.labels.date.toUpperCase()}</span>
                            <span className={classes.subtitleText}>{this.props.reservation.createdAt ? `${moment(this.props.reservation.createdAt).format('ll')}` : '-'}</span>
                        </div>
                    </div>
                    <div className={classes.heading}>
                        <div className={classes.titleContainer}>
        <span className={classes.titleText}>{this.props.language.titles.status}</span>
                            {this.renderStatusHandler()}
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.expandedContainer}>
                        <div className={classes.expandedContainerItem}>
                            <div>
                                <span className={classes.titleText}>{this.props.language.titles.clientDetails}</span>
                            </div>
                            <div className={classes.clientDetailsContainer}>
                                <span className={classes.subtitleText}>{this.props.language.labels.clientName}: {this.props.reservation.clientName}</span>
                                <span className={classes.subtitleText}>{this.props.language.labels.clientEmail}: {this.props.reservation.clientEmail}</span>
                            </div>
                        </div>
                        {this.renderMiddleSectionHandler()}
                        <div className={classes.expandedContainerItemLast}>
                            <div className={classes.titleText}>
                                <span className={classes.titleText}>{this.props.language.titles.problems}</span>
                            </div>
                            <div onClick={this.props.showProblemsHandler} className={classes.problemsContainer}>
                                {this.props.reservation.problem ? this.props.reservation.problem.map((problem, index) => {
                                    return (
                                        <div>
                                            <li><span className={classes.subtitleText}>{problem.name}</span></li>
                                        </div>
                                    )
                                }) : '-'}
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminReservation))