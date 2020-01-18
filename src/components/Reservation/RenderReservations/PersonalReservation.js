import React from 'react'
import { withStyles, Avatar, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';

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
    headingLastElement: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '18%',
        flexShrink: 0,
        marginLeft: 'auto'
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
    },
    problemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer'
    },
    workOnClick: {
        cursor: 'pointer'
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    acceptIcon: {
        color: 'green',
        cursor: 'pointer'
    },
    declineIcon: {
        color: 'red',
        cursor: 'pointer'
    },
    optionsContainer: {
        textAlign: 'center'
    },
    options: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
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
})


class PersonalReservation extends React.Component {

    renderStatusHandler = () => {
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
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                        </div>
                    </Typography>

                    <Typography className={classes.heading}>
                        <div className={classes.titleContainer}>
                            <span className={classes.titleText}>BRAND / MODEL</span>
                            <span className={classes.subtitleText}>{this.props.reservation.carBrandId.name} {this.props.reservation.carModelId.name}</span>
                        </div>
                    </Typography>
                    <Typography className={classes.headingLastElement}>
                        <div className={classes.titleContainer}>
                            <span className={classes.titleText}>STATUS</span>
                            {this.renderStatusHandler()}
                        </div>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.expandedContainer}>
                        <div className={classes.expandedContainerItem}>
                            <div className={classes.titleText}>
                                <span className={classes.titleText}>CAR PROBLEMS</span>
                            </div>
                            <div className={classes.problemsContainer}>
                                {this.props.reservation.problem ? this.props.reservation.problem.map((problem, index) => {
                                    return (
                                        <div>
                                            <li><span className={classes.subtitleText}>{problem.name}</span></li>
                                        </div>
                                    )
                                }) : '-'}
                            </div>
                        </div>
                        <div className={classes.expandedContainerItem}>
                            <div className={this.props.classes.options}>
                                <span className={this.props.classes.titleText}>Did you resolved all problems?</span>
                                <div className={this.props.classes.optionsContainer}>
                                    <CheckIcon className={classes.acceptIcon} onClick={() => this.props.modifyStatus(this.props.reservation._id, CONSTANTS.RESERVATION_DONE, this.props.login.userId)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalReservation))