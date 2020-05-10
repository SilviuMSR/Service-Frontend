import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { mapToDropdownSelector } from '../../../utils/apiFunctions'

import { validations } from '../../../utils/validations'

import * as CONSTANTS from '../../../utils/constants'
import * as PROBLEM from '../../../redux/actions/problems'
import * as NOTIFICATIONS from '../../../utils/notification'

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
        padding: 16
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
        padding: 5, fontWeight: 500, fontSize: 18, color: '#545A63', margin: 0
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
        { value: '', type: 'text', label: this.props.language.labels.name, name: 'name', validation: { checks: [validations.notEmpty] } },
        { value: '', type: 'text', label: this.props.language.labels.steps, name: 'steps' },
        { value: '', type: 'number', label: this.props.language.labels.price, name: 'price', validation: { checks: [validations.notEmpty] } },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.difficulty, name: 'difficulty', options: CONSTANTS.PROBLEM_DIFFICULTY }
    ]

    newStepInitialFields = [
        { value: '', type: 'text', label: this.props.language.labels.newStep, name: 'newStep' },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.addAfter, name: 'stepAfter', options: [] }
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
                        touched: true,
                        error: false
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
            NOTIFICATIONS.error(this.props.language.toastr.notFound)
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

    validate = () => {
        let newFields = [...this.state.modalFields]
        let nameIndex = newFields.findIndex(index => index.name === 'name')
        let priceIndex = newFields.findIndex(index => index.name === 'price')
        let isValid = true

        // Check if name field is completed
        let name = newFields[nameIndex].value
        let price = newFields[priceIndex].value
        if (name === '') {
            newFields[nameIndex].error = true
            isValid = false
        }

        if (!price) {
            newFields[priceIndex].error = true
            isValid = false
        }

        this.setState({ modalFields: [...Object.values(newFields)] })
        return isValid
    }

    onAddHandler = () => {
        if (!this.validate()) return NOTIFICATIONS.error(this.props.language.toastr.failAdd)
        this.props.createProblem(this.createProblemJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.add)
            this.onCancelHandler()
            this.props.getProblems()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failAdd))
    }

    onEditHandler = () => {
        if (!this.validate()) return NOTIFICATIONS.error(this.props.language.toastr.failAdd)
        const addNewStepJson = this.state.addNewStep ? this.createNewStepJson() : {}
        this.props.edit(this.props.problemId, this.createProblemJson(), this.state.addNewStep, addNewStepJson).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.edit)
            this.onCancelHandler()
            this.props.getProblems()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failEdit))
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
        return (<div className={this.props.classes.modalContainer}>
            <div style={{ borderRight: this.props.type === CONSTANTS.EDIT ? '1px solid rgba(0,0,0,0.1)' : '' }} className={this.props.classes.problemDetails}>
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
            {this.props.type === CONSTANTS.EDIT && stepsIndex > -1 && this.state.modalFields[stepsIndex].value.length && <div className={this.props.classes.stepsContainer}>
                <div className={this.props.classes.stepsContainerHeader}>
                    <p className={this.props.classes.stepsTitle}>{this.props.language.titles.steps}</p>
                    <Button color="primary" onClick={() => this.addNewStepHandler()} className={`${this.props.classes.marginLeftAuto}`}>{this.props.language.buttons.add}</Button>
                </div>
                <div className={this.props.classes.steps}>
                    <div className={this.props.classes.currentSteps}>
                        {this.state.modalFields[stepsIndex].value.map((step, index) => {
                            if (index !== 0) {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <li style={{ fontWeight: 'bold', paddingLeft: 5 }}>{step}</li>
                                        <Delete style={{ color: 'black', cursor: 'pointer' }} onClick={() => {
                                            this.deleteStepHandler(step)
                                        }} />
                                    </div>
                                )
                            } else return null
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
            </div>}
        </div>)
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
                    acceptButtonText={this.props.language.buttons.save}
                    cancelButtonText={this.props.language.buttons.cancel}
                    onAccept={this.props.type === CONSTANTS.CREATE ? this.onAddHandler : this.onEditHandler}
                    maxWidth={"md"}
                    title={this.props.type === CONSTANTS.CREATE ? this.props.language.titles.addProblem : this.props.language.titles.editProblem}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderProblemFields()}
                </SimpleModal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
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