import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { mapToDropdownSelector } from '../../../utils/apiFunctions'

import * as CONSTANTS from '../../../utils/constants'
import * as PROBLEM from '../../../redux/actions/problems'

import InputGenerator from '../../common/InputGenerator'
import SimpleModal from '../../common/SimpleModal'

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
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    problemDetails: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    stepsContainer: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 16
    },
    stepsContainerHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    marginLeftAuto: {
        marginLeft: 'auto'
    },
    stepsTitle: {
        fontSize: 18,
        fontWeight: 500
    },
    steps: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    currentSteps: {
        flex: 2
    },
    newStep: {
        flex: 1
    }
})

class CreateCarProblem extends Component {

    todayValue = moment().format(CONSTANTS.INPUT_TYPE_DATE_FORMAT)

    initialFields = [
        { value: '', type: 'text', label: 'Name', name: 'name' },
        { value: '', type: 'text', label: 'Steps', name: 'steps' },
        { value: '', type: 'number', label: 'Price', name: 'price' },
        { value: '', type: 'dropdownSelector', label: 'Difficulty', name: 'difficulty', options: CONSTANTS.PROBLEM_DIFFICULTY }
    ]

    newStepInitialFields = [
        { value: '', type: 'text', label: 'New step', name: 'newStep' },
        { value: '', type: 'dropdownSelector', label: 'Add after', name: 'stepAfter', options: [] }
    ]

    state = {
        modalFields: this.initialFields,
        newStepModalFields: this.newStepInitialFields,
        addNewStep: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.type === CONSTANTS.EDIT) this.toggleEditModal(nextProps.problemId)
    }

    toggleEditModal = problemId => {
        this.props.getProblemById(problemId).then(response => {
            let modalFieldsCopy = [...this.state.modalFields].map(field => {
                if (field.type === 'dropdownSelector') {
                    return ({
                        ...field,
                        value: response[field.name],
                        options: field.options.map(option => {
                            return ({ ...option, value: String(option.id) === String(response[field.name]) ? true : false })
                        }),
                        touched: true
                    })
                }

                return ({
                    ...field,
                    value: response[field.name]
                })
            })

            this.setState({
                modalFields: modalFieldsCopy
            })
        }).catch(() => {
            alert("NOT FOUND")
        })
    }

    createProblemJson = () => {
        let problemJson = {}

        this.state.modalFields.forEach(field => {
            problemJson[field.name] = field.value
        })
        problemJson['createdAt'] = this.todayValue

        return problemJson
    }

    createNewStepJson = () => {
        let newStepJson = {}

        this.state.newStepModalFields.forEach(field => {
            newStepJson[field.name] = field.value
        })

        return newStepJson
    }

    onAddHandler = () => {
        this.props.createProblem(this.createProblemJson()).then(() => {
            this.onCancelHandler()
            this.props.getProblems()
        })
    }

    onEditHandler = () => {
        const addNewStepJson = this.state.addNewStep ? this.createNewStepJson() : {}
        this.props.edit(this.props.problemId, this.createProblemJson(), this.state.addNewStep, addNewStepJson).then(() => {
            this.onCancelHandler()
            this.props.getProblems()
        })
    }

    onChangeHandler = event => {
        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            modalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ modalFields: modalFieldsCopy })
        }
    }

    onChangeHandlerNewStep = event => {
        let currentIndex = this.state.newStepModalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let newStepModalFieldsCopy = [...this.state.newStepModalFields].map(field => ({ ...field }))
            newStepModalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ newStepModalFields: newStepModalFieldsCopy })
        }
    }

    addNewStepHandler = () => {
        const stepsIndex = this.state.modalFields.findIndex(field => field.name === 'steps')
        const stepAfterIndex = this.state.newStepModalFields.findIndex(field => field.name === 'stepAfter')

        let newStepModalFieldsCopy = [...this.state.newStepModalFields].map(field => ({ ...field }))

        if (stepsIndex > -1 && stepAfterIndex > -1) {
            const currentSteps = this.state.modalFields[stepsIndex].value.map(step => ({ name: step }))
            newStepModalFieldsCopy[stepAfterIndex].options = mapToDropdownSelector(currentSteps)
            this.setState({ addNewStep: true, newStepModalFields: newStepModalFieldsCopy })
        }
    }

    deleteStepHandler = step => {
        this.props.deleteStep(this.props.problemId, step).then(() => {
            this.toggleEditModal(this.props.problemId)
        })
    }

    renderProblemFields = () => {
        const stepsIndex = this.state.modalFields.findIndex(field => field.name === 'steps')
        if (stepsIndex && this.state.modalFields[stepsIndex].value.length)
            return (<div className={this.props.classes.modalContainer}>
                <div className={this.props.classes.problemDetails}>
                    {
                        this.state.modalFields.map((field, index) => {
                            if (field.name !== 'steps')
                                return <InputGenerator
                                    key={index}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={event => this.onChangeHandler(event)}
                                    {...field} />
                        })
                    }
                </div>
                <div className={this.props.classes.stepsContainer}>
                    <div className={this.props.classes.stepsContainerHeader}>
                        <p className={this.props.classes.stepsTitle}>Steps</p>
                        <Button color="primary" onClick={() => this.addNewStepHandler()} className={`${this.props.classes.marginLeftAuto}`}>ADD NEW STEP</Button>
                    </div>
                    <div className={this.props.classes.steps}>
                        <div className={this.props.classes.currentSteps}>
                            {this.state.modalFields[stepsIndex].value.map(step => {
                                return (
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <li>{step}</li>
                                        <Delete style={{color: '#e53935', cursor: 'pointer'}} onClick={() => {
                                            this.deleteStepHandler(step)
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                        {this.state.addNewStep && <div className={this.props.classes.newStep}>
                            {this.state.newStepModalFields.map(field => {
                                return (
                                    <InputGenerator
                                        margin="dense"
                                        fullWidth={true}
                                        onChange={event => this.onChangeHandlerNewStep(event)}
                                        {...field} />
                                )
                            })}
                        </div>
                        }
                    </div>
                </div>
            </div>)
        else return null
    }

    onCancelHandler = () => {
        this.props.onCancel()
        this.setState({
            modalFields: this.initialFields,
            newStepModalFields: this.newStepInitialFields,
            addNewStep: false
        })
    }

    render() {
        return (
            <>
                <SimpleModal
                    acceptButtonText="Adauga"
                    cancelButtonText="Anuleaza"
                    onAccept={this.props.type === CONSTANTS.CREATE ? this.onAddHandler : this.onEditHandler}
                    maxWidth={"md"}
                    title={"Adauga problema"}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderProblemFields()}
                </SimpleModal>
            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        createProblem: problem => dispatch(PROBLEM.create(problem)),
        deleteStep: (problemId, step) => dispatch(PROBLEM.del(problemId, step)),
        getProblemById: problemId => dispatch(PROBLEM.getById(problemId)),
        edit: (problem, problemId, modifySteps, newSteps) => dispatch(PROBLEM.edit(problem, problemId, modifySteps, newSteps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCarProblem))