import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'
import { FirstPage, AvTimer, LastPage } from '@material-ui/icons'
import * as STATISTICS from '../../redux/actions/statistics'

import EmployeePie from './EmployeePie'
import EmployeeDonePie from './EmployeeDonePie'

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
        '&:hover': {
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        },
        transition: 'all 280ms ease-in-out',
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
        fontSize: 34,
        paddingRight: 14
    },
    redColor: {
        color: '#d32f2f !important'
    },
    greenColor: {
        color: '#4caf50 !important'
    },
    topTenContainer: {
        height: '60%',
        width: '50%',
        paddingLeft: 24
    },
    employeeDoneContainer: {
        height: '60%',
        width: '50%',
        paddingLeft: 24
    }
})

class EmployeeDash extends Component {

    state = {
        renderPage: false,
        statistics: []
    }

    componentDidMount() {
        this.props.getStatistics().then(statistics => {
            this.setState({
                statistics: statistics.reservationsPerEmployee,
                topTenEmployeePie: statistics.reservationsPerEmployee.slice(0, 10).map(employee => ({
                    ["id"]: employee.employee,
                    ["label"]: employee.employee,
                    ["value"]: employee.nrOfReservations
                })),
                reservationsDonePerEmployee: statistics.reservationsPerEmployee.map(employee => ({
                    ["id"]: employee.employee,
                    ["label"]: employee.employee,
                    ["value"]: employee.done
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
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.state.statistics && this.state.statistics.length > 0 ? this.state.statistics[0].employee : '-'}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics && this.state.statistics.length > 0 ? this.state.statistics[0].nrOfReservations : '-'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <FirstPage className={`${this.props.classes.icon}`} />
                            </div>
                        </div>
                        <div className={`${this.props.classes.resPercentContainer} ${this.props.classes.flexRow} ${this.props.classes.equalFlex}`}>
                            <div className={`${this.props.classes.leftSideContainer}`}>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.state.statistics && this.state.statistics.length > 1 ? this.state.statistics[1].employee : '-'}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics && this.state.statistics.length > 1 ? this.state.statistics[1].nrOfReservations : '-'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <AvTimer className={`${this.props.classes.icon}`} />
                            </div>
                        </div>
                        <div className={`${this.props.classes.resPercentContainer} ${this.props.classes.flexRow} ${this.props.classes.equalFlex}`}>
                            <div className={`${this.props.classes.leftSideContainer}`}>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.cardTitle}`}>{this.state.statistics && this.state.statistics.length > 2 ? this.state.statistics[2].employee : '-'}</div>
                                <div className={`${this.props.classes.equalFlex} ${this.props.classes.value}`}>{this.state.statistics && this.state.statistics.length > 2 ? this.state.statistics[2].nrOfReservations : '-'}</div>
                            </div>
                            <div className={this.props.classes.rightSideContainer}>
                                <LastPage className={`${this.props.classes.icon}`} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'calc(100% - 171px)' }}>
                        <div className={this.props.classes.topTenContainer}>
                            <p className={`${this.props.classes.cardTitle}`}>Top 10 employees</p>
                            <EmployeePie data={this.state.topTenEmployeePie} />
                        </div>
                        <div className={this.props.classes.employeeDoneContainer}>
                            <p className={`${this.props.classes.cardTitle}`}>Finished reservations per employee</p>
                            <EmployeeDonePie data={this.state.reservationsDonePerEmployee} />
                        </div>
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
        getStatistics: () => dispatch(STATISTICS.getEmployeeStatistics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeeDash))