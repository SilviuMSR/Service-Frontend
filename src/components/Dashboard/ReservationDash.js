import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'
import { Equalizer as AllReservationsIcon, CheckCircle as DoneReservationsIcon, PlaylistAddCheck as AcceptedReservationsIcon } from '@material-ui/icons'

import * as STATISTICS from '../../redux/actions/statistics'

import ReservationBarchart from './ReservationBarChart'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    equalFlex: {
        flex: 1
    },
    center: {
        justifyContent: 'center'
    },
    resPercentContainer: {
        minHeight: 60,
        background: '#f7f8fa',
        border: '#d9d9d9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: 16,
        margin: 16
    },
    percentContainer: {
        padding: '10px 10px 8px 4px'
    },
    leftSideContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightSideContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cardTitle: {
        color: '#757575 !important',
        fontSize: 18
    },
    value: {
        fontSize: '24px',
        fontWeight: 500,
        color: '#606771'
    },
    icon: {
        fontSize: 32,
        paddingRight: 14
    },
    redColor: {
        color: '#d32f2f !important'
    },
    greenColor: {
        color: '#4caf50 !important'
    },
    barContainer: {
        height: '50%',
        width: '90%',
        paddingLeft: 24
    }
})

class ReservationDashboard extends Component {

    state = {
        renderPage: false,
        statistics: null
    }

    componentDidMount() {
        this.props.getStatistics().then(statistics => {
            this.setState({
                statistics: statistics,
                reservationChartData: statistics.reservationsForDays.map(res => ({
                    ["day"]: res.date,
                    ["reservations"]: res.nrOfReservations
                })),
                renderPage: true
            })
        })
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    <div className={`${this.props.classes.percentContainer} ${this.props.classes.flexRow} ${this.props.classes.center}`}>
                        <div className={`${this.props.classes.resPercentContainer} ${this.props.classes.flexRow} ${this.props.classes.equalFlex}`}>
                            <div className={`${this.props.classes.leftSideContainer}`}>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.props.language.statistics.allReservations}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics ? this.state.statistics.allReservationsCount : '-'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <AllReservationsIcon className={`${this.props.classes.icon} ${this.props.classes.redColor}`} />
                            </div>
                        </div>
                        <div className={`${this.props.classes.resPercentContainer} ${this.props.classes.flexRow} ${this.props.classes.equalFlex}`}>
                            <div className={`${this.props.classes.leftSideContainer}`}>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.props.language.statistics.doneReservations}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics ? `${(this.state.statistics.doneReservations / this.state.statistics.allReservationsCount * 100).toFixed(2)}%` : '--%'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <DoneReservationsIcon className={`${this.props.classes.icon} ${this.props.classes.greenColor}`} />
                            </div>
                        </div>
                        <div className={`${this.props.classes.resPercentContainer} ${this.props.classes.flexRow} ${this.props.classes.equalFlex}`}>
                            <div className={`${this.props.classes.leftSideContainer}`}>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.props.language.statistics.acceptedReservations}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics ? this.state.statistics.acceptedReservations : '-'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <AcceptedReservationsIcon className={`${this.props.classes.icon}`} />
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.barContainer}>
                        <p className={`${this.props.classes.cardTitle}`}>Daily reservations</p>
                        <ReservationBarchart data={this.state.reservationChartData} />
                    </div>
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login,
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        getStatistics: () => dispatch(STATISTICS.getReservationStatistics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReservationDashboard))