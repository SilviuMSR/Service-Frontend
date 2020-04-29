import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button } from '@material-ui/core'
import * as STATISTICS from '../../redux/actions/statistics'

import CarBrandBar from './CarBrandBar'
import CarModelBar from './CarModelBar'
import CarProblemBar from './CarProblemBar'

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
    topTenContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '40%',
        width: '90%',
        paddingLeft: 24
    },
    brands: {
        height: '100%',
        width: '45%'
    },
    models: {
        marginLeft: 'auto',
        height: '100%',
        width: '45%',
        paddingLeft: 24
    },
    employeeDoneContainer: {
        height: '40%',
        width: '90%',
        marginTop: 60,
        paddingLeft: 24
    }
})

class CarDash extends Component {

    state = {
        renderPage: false,
        statistics: []
    }

    componentDidMount() {
        this.props.getStatistics().then(statistics => {
            this.setState({
                statistics: statistics,
                carProblemBar: [],
                selectedModel: "BMW",
                renderPage: true
            })
        })
    }

    computeDataProblem = () => {
        if (this.state.statistics && this.state.statistics.reservationsPerProblem && this.state.statistics.reservationsPerProblem.length) {
            const dataArray = []

            this.state.statistics.reservationsPerProblem.forEach(data => {
                dataArray.push({ ["id"]: data.problem, ["label"]: data.problem, ["value"]: data.nrOfReservations })
            })
            return dataArray
        }

        return []
    }

    computeDataBrand = () => {
        if (this.state.statistics && this.state.statistics.reservationsPerBrand && this.state.statistics.reservationsPerBrand.length) {
            const dataArray = []
            const statisticsArray = this.state.statistics.reservationsPerBrand
            statisticsArray.forEach(data => {
                dataArray.push({ ["id"]: data.brand, ["label"]: data.brand, ["value"]: data.nrOfReservations })
            })
            return dataArray
        }

        return []
    }

    computeDataModel = brand => {
        if (this.state.statistics && this.state.statistics.reservationsPerModel && this.state.statistics.reservationsPerModel.length) {
            const dataArray = []
            const statisticsArray = this.state.statistics.reservationsPerModel.filter(st => st.brand.toLowerCase() === brand.toLowerCase())
            statisticsArray.forEach(data => {
                dataArray.push({ ["id"]: data.model, ["label"]: data.model, ["value"]: data.nrOfReservations })
            })
            return dataArray
        }

        return []
    }

    render() {
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100% - 71px)' }}>
                        <div className={this.props.classes.topTenContainer}>
                            <div className={this.props.classes.brands}>
                                <p className={`${this.props.classes.cardTitle}`}>{`Brands`}</p>
                                <CarBrandBar onClick={data => this.setState({ selectedModel: data.label })} data={this.computeDataBrand()} />
                            </div>
                            <div className={this.props.classes.models}>
                                <p className={`${this.props.classes.cardTitle}`}>{`Models`}</p>
                                <CarModelBar data={this.computeDataModel(this.state.selectedModel)} />
                            </div>
                        </div>
                        <div className={this.props.classes.employeeDoneContainer}>
                            <p className={`${this.props.classes.cardTitle}`}>Problems</p>
                            <CarProblemBar data={this.computeDataProblem()} />
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
        getStatistics: () => dispatch(STATISTICS.getCarsAndProblemsStatistics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarDash))