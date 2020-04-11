import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'
import * as CONSTANTS from '../../../utils/constants'
import * as PROBLEMS from '../../../redux/actions/problems'

import CreateCarProblem from './CreateCarProblem'

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
                <CreateCarProblem problemId={this.problemToEdit._id} type={this.state.modalType} getProblems={() => this.getProblems()} open={this.state.openModal} onCancel={() => {
                    this.getProblems()
                    this.setState({ openModal: false })
                }} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>CAR PROBLEMS</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button>
                            <div className={this.props.classes.searchContainer}><TextField placeholder="Search..." /></div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#F8F8F8', margin: '20px 55px', flex: 1, border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            displayMainPhoto={false}
                            type={CONSTANTS.BRAND_TYPE}
                            onEdit={item => {
                                this.problemToEdit = item
                                this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                            }}
                            onDelete={item => {
                                this.problemToDelete = item
                                this.setState({ openConfirmationModal: true })
                            }}
                            onClick={item => { }}
                            content={[{ field: 'name', label: 'Name' }, { field: 'difficulty', label: 'Difficulty' }, { field: 'price', label: 'Price' }, { field: 'steps', label: 'No. steps', length: true }]}
                            items={this.state.problems} />
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