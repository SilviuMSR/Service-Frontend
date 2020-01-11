import React from 'react'
import { withStyles, Avatar, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

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
    ovalRed: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'red',
        marginRight: 10
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
    }
})


class EmployeeReservation extends React.Component {

    renderStatusHandler = () => {
        if (this.props.reservation.reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalPanding} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_PANDING}</span>
            </div>
        )
        return <span>-</span>
    }

    render() {
        let { classes } = this.props
        console.log(this.props)
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Avatar alt="Remy Sharp" src="" />
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
                                            <span className={classes.subtitleText}>{index + 1}. {problem.name}</span>
                                        </div>
                                    )
                                }) : '-'}
                            </div>
                        </div>
                        <div className={classes.expandedContainerItem}>
                            <div className={this.props.classes.options}>
                                <span className={this.props.classes.titleText}>This reservation wait for an employee!</span>
                                <div className={this.props.classes.optionsContainer}>
                                    <Button onClick={() => this.props.modifyStatus(this.props.reservation._id, CONSTANTS.RESERVATION_IN_PROGRESS, this.props.login.userId)}>Take this reservation</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeeReservation))