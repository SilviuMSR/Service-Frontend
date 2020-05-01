import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import moment from 'moment'

import InputGenerator from '../common/InputGenerator'
import SimpleModal from '../common/SimpleModal'

import { mapToDropdownSelector, mapToMultipleSelector, findIndexInArray } from '../../utils/apiFunctions'
import { validations } from '../../utils/validations'

import * as CONSTANTS from '../../utils/constants'
import * as PROBLEMS from '../../redux/actions/problems'
import * as BRANDS from '../../redux/actions/brands'
import * as MODELS from '../../redux/actions/models'
import * as RESERVATION from '../../redux/actions/reservation'
import * as NOTIFICATION from '../../utils/notification'

import '../../styles/CreateReservation.css'

class CreateReservation extends Component {

    todayValue = moment().format(CONSTANTS.INPUT_TYPE_DATE_FORMAT)

    initialFields = [
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.brand, name: 'carBrandId', options: [] },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.model, name: 'carModelId', options: [] },
        { value: '', type: 'text', label: this.props.language.labels.clientEmail, name: 'clientEmail', validation: { checks: [validations.notEmpty] } },
        { value: '', type: 'text', label: this.props.language.labels.clientName, name: 'clientName', validation: { checks: [validations.notEmpty] } },
        { value: '', type: 'radioSelector', label: this.props.language.labels.problemKnow, name: 'knowingStatus', options: CONSTANTS.RESERVATION_PROBLEMS_OPTION.map(op => ({ ...op, label: this.props.language.labels.knowProblem[op.name] })) }
    ]

    knowingProblem = [
        { type: 'multiSelector', utils: '', name: 'problem', value: [] },
        { value: 0, type: 'number', disabled: true, label: this.props.language.labels.price, name: 'price' }
    ]

    state = {
        modalFields: this.initialFields,
        modalFieldsProblem: this.knowingProblem,
        problemKnow: false,
        openProblemModal: false,
        problemsList: []
    }

    populateWithBrands = () => {
        this.props.getBrands().then(brands => {
            let brandIndex = findIndexInArray(this.state.modalFields, 'carBrandId')
            if (brandIndex > -1) {
                let modalFieldsCopy = [...this.state.modalFields].map(el => ({ ...el }))
                modalFieldsCopy[brandIndex].options = mapToDropdownSelector(brands.brands)
                this.setState({ modalFields: modalFieldsCopy })
            }
        })
    }

    componentDidMount() {
        this.populateWithBrands()
    }

    onChangeHandler = event => {
        let modalFieldsProblemCopy = [...this.state.modalFieldsProblem].map(field => ({ ...field }))
        let problemIndex = findIndexInArray(modalFieldsProblemCopy, 'problem')
        let priceIndex = findIndexInArray(modalFieldsProblemCopy, 'price')

        // Calculate prices for selected problems
        if (this.state.problemKnow && this.state.openProblemModal) {
            if (problemIndex > -1) {
                modalFieldsProblemCopy[problemIndex].value = event.target.value
                this.setState({ modalFieldsProblem: modalFieldsProblemCopy })
            }
            if (priceIndex > -1) {
                let prices = modalFieldsProblemCopy[problemIndex].value.length ? modalFieldsProblemCopy[problemIndex].value.filter(field => field.value).map(field => field.price) : []
                modalFieldsProblemCopy[priceIndex].value = prices.length ? prices.reduce((sum, price) => sum + price) : 0
                this.setState({ modalFieldsProblem: modalFieldsProblemCopy })
            }
        }

        // Handle input changes
        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            if (modalFieldsCopy[currentIndex].name.toLowerCase() === CONSTANTS.PROBLEM.toLowerCase()) {
                if (event.target.value.toLowerCase() === CONSTANTS.YES.toLowerCase()) {
                    this.props.getProblems().then(problems => {
                        modalFieldsProblemCopy[problemIndex].value = mapToMultipleSelector(problems.carProblems)
                        this.setState({ modalFieldsProblem: modalFieldsProblemCopy, problemKnow: true, openProblemModal: true })
                    })
                }
                else this.setState({ problemKnow: false, modalFieldsProblem: this.knowingProblem })
            }
            modalFieldsCopy[currentIndex].value = event.target.value
            this.setState({ modalFields: modalFieldsCopy })

            if (modalFieldsCopy[currentIndex].name.toLowerCase() === CONSTANTS.CAR_BRAND_ID.toLowerCase()) {
                this.props.getModelByBrandId(modalFieldsCopy[currentIndex].value).then(models => {
                    let modelsIndex = findIndexInArray(modalFieldsCopy, 'carModelId')
                    if (modelsIndex > -1) {
                        modalFieldsCopy[modelsIndex].options = mapToDropdownSelector(models)
                        this.setState({ modalFields: modalFieldsCopy })
                    }
                })
            }
        }
    }

    onResetHandler = () => {
        this.setState({ modalFields: this.initialFields, modalFieldsProblem: this.knowingProblem, problemKnow: false })
    }

    createReservationJson = () => {
        let reservationJson = {}

        let problemsIndex = findIndexInArray(this.state.modalFieldsProblem, 'problem')
        let priceIndex = findIndexInArray(this.state.modalFieldsProblem, 'price')

        if (problemsIndex > -1) {
            reservationJson.problem = this.state.modalFieldsProblem[problemsIndex].value.filter(field => field.value).map(field => field.id)
        }

        if (priceIndex > -1) {
            reservationJson['price'] = this.state.modalFieldsProblem[priceIndex].value
        }

        this.state.modalFields.forEach(field => reservationJson[field.name] = field.value)
        reservationJson['createdAt'] = this.todayValue

        return reservationJson

    }

    validate = () => {
        let newFields = [...this.state.modalFields]
        let emailIndex = newFields.findIndex(index => index.name === 'clientEmail')
        let nameIndex = newFields.findIndex(index => index.name === 'clientName')
        let isValid = true

        // Check if name field is completed
        let name = newFields[nameIndex].value
        if (name === '') {
            newFields[nameIndex].error = true
            isValid = false
        }

        let email = newFields[emailIndex].value
        if (email === '') {
            newFields[emailIndex].error = true
            isValid = false
        }

        this.setState({ modalFields: [...Object.values(newFields)] })
        return isValid
    }

    onSubmitHandler = () => {
        if (!this.validate()) return NOTIFICATION.error(this.props.language.toastr.failAdd)
        let reservationJson = this.createReservationJson()
        this.props.createReservation(reservationJson).then(result => {
            this.onResetHandler()
            this.populateWithBrands()
            return NOTIFICATION.success(this.props.language.toastr.add)
        })
            .catch(() => NOTIFICATION.error(this.props.language.toastr.failAdd))
    }

    renderFields = () => {
        return this.state.modalFields.map((field, index) => <InputGenerator
            key={index}
            margin="dense"
            fullWidth={true}
            onChange={event => this.onChangeHandler(event)}
            {...field} />)
    }

    render() {
        return (
            <div className="container">
                <div className="fieldsContainer">
                    <SimpleModal title={this.props.language.titles.chooseProblem}
                        open={this.state.openProblemModal}
                        cancelButtonText={this.props.language.buttons.cancel}
                        acceptButtonText={this.props.language.buttons.add}
                        onAccept={() => this.setState({ openProblemModal: false })}
                        onCancel={() => this.setState({ openProblemModal: false })}>
                        {
                            this.state.modalFieldsProblem.filter(field => field.name === 'problem').map((field, index) => {
                                return <InputGenerator
                                    key={index}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={event => this.onChangeHandler(event)}
                                    {...field} />
                            })
                        }
                    </SimpleModal>
                    {this.renderFields()}
                    {this.state.problemKnow ?
                        this.state.modalFieldsProblem.filter(field => field.name !== 'problem').map((field, index) => {
                            return <InputGenerator
                                key={index}
                                margin="dense"
                                fullWidth={true}
                                onChange={event => this.onChangeHandler(event)}
                                {...field} />
                        })
                        : ""}
                    <div className="buttonsContainer">
                        <Button style={{ margin: 3 }} color="primary" onClick={this.onSubmitHandler}>{this.props.language.buttons.add}</Button>
                        <Button style={{ margin: 3 }} color="secondary" onClick={this.onResetHandler}>{this.props.language.buttons.reset}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        getBrands: () => dispatch(BRANDS.get()),
        getModelByBrandId: carBrandId => dispatch(MODELS.getModelByBrandId(carBrandId)),
        getProblems: () => dispatch(PROBLEMS.get()),
        createReservation: reservation => dispatch(RESERVATION.create(reservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReservation)