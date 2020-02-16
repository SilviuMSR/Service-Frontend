import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import ConfirmationModal from '../../common/ConfirmationDialog'
import * as CONSTANTS from '../../../utils/constants'
import * as PROBLEMS from '../../../redux/actions/problems'

import CreateCarProblem from './CreateCarProblem'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    containerContent: {
        margin: '24px 100px 24px 100px'
    },
    headersContainer: {
        height: 50,
        width: 300,
        margin: '10px 100px 0px auto',
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'content-box'
    },
    addContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    searchContainer: {
        flex: 3,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class CarProblem extends Component {

    problemToEdit = {}
    problemToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        problems: [],
        openConfirmationModal: false
    }

    componentDidMount() {
        this.getProblems()
    }

    getProblems = () => {
        this.props.getProblems().then(result => {
            this.setState({
                problems: result.carProblems
            })
        })
    }

    deleteProblemHandler = () => {
        this.props.delete(this.problemToDelete._id).then(() => {
            this.getProblems()
            this.setState({ openConfirmationModal: false })
        })
    }

    closeConfirmationModalHandler = () => {
        this.problemToDelete = {}
        this.setState({ openConfirmationModal: false })
    }

    render() {
        return (
            <>
                <ConfirmationModal
                    text={`Delete?`}
                    cancelButtonText={"Cancel"}
                    acceptButtonText={"Delete"}
                    open={this.state.openConfirmationModal}
                    onClose={this.closeConfirmationModalHandler}
                    onCancel={this.closeConfirmationModalHandler}
                    onAccept={() => this.deleteProblemHandler()} />
                <CreateCarProblem problemId={this.problemToEdit._id} type={this.state.modalType} getProblems={() => this.getProblems()} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.addContainer}><Button onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button></div>
                        <div className={this.props.classes.searchContainer}><TextField placeholder="Search..." /></div>
                    </div>
                    <div>
                        {this.state.problems.map(problem => {
                            return (
                                <div onClick={() => {
                                    this.problemToEdit = problem
                                    this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                }}>
                                    {problem.name}
                                    <Delete onClick={() => {
                                        this.problemToDelete = problem
                                        this.setState({ openConfirmationModal: true })
                                    }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        getProblems: () => dispatch(PROBLEMS.get()),
        delete: problemId => dispatch(PROBLEMS.del(problemId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarProblem))