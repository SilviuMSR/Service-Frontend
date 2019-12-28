import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import InputGenerator from '../common/InputGenerator'
import { mapToDropdownSelector, findIndexInArray } from '../../utils/apiFunctions'
import * as CONSTANTS from '../../utils/constants'
import * as BRANDS from '../../redux/actions/brands'
import * as MODELS from '../../redux/actions/models'
import * as RESERVATION from '../../redux/actions/reservation'
import * as NOTIFICATION from '../../utils/notification'

import '../../styles/CreateReservation.css'

class CreateReservation extends Component {

    initialFields = [
        { value: '', type: 'dropdownSelector', label: 'Brand', name: 'carBrandId', options: [] },
        { value: '', type: 'dropdownSelector', label: 'Model', name: 'carModelId', options: [] },
        { value: '', type: 'text', label: 'Email client', name: 'clientEmail' },
        { value: '', type: 'text', label: 'Nume client', name: 'clientName' },
        { value: 'Nu', type: 'radioSelector', label: 'Cunosti cauza problemei?', name: 'knowingStatus', options: CONSTANTS.RESERVATION_PROBLEMS_OPTION }
    ]

    knowingProblem = [
        { value: '', type: 'radioSelector', label: 'Alege cauza problemei', name: 'problem', options: CONSTANTS.RESERVATION_PROBLEMS_LIST },
        { value: '', type: 'number', disabled: true, label: 'Pret', name: 'price' }
    ]

    state = {
        modalFields: this.initialFields,
        modalFieldsProblem: this.knowingProblem,
        problemKnow: false
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

        if (this.state.problemKnow) {
            let problemIndex = this.state.modalFieldsProblem.findIndex(field => field.name === event.target.name)

            if (problemIndex > -1) {
                let modalFieldsProblemCopy = [...this.state.modalFieldsProblem].map(field => ({ ...field }))

                modalFieldsProblemCopy[problemIndex].value = event.target.value
                this.setState({ modalFieldsProblem: modalFieldsProblemCopy })
            }
        }

        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            if (modalFieldsCopy[currentIndex].name.toLowerCase() === CONSTANTS.PROBLEM.toLowerCase()) {
                if (modalFieldsCopy[currentIndex].value === CONSTANTS.NO) this.setState({ problemKnow: true })
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
        this.setState({ modalFields: this.initialFields })
    }

    createReservationJson = () => {
        let reservationJson = {}
        let problemArray = []

        let problemsIndex = findIndexInArray(this.state.modalFieldsProblem, 'problem')
        let priceIndex = findIndexInArray(this.state.modalFieldsProblem, 'price')

        if (problemsIndex > -1) {
            problemArray = problemArray.concat(this.state.modalFieldsProblem[problemsIndex].value)
            reservationJson.problem = problemArray.filter(el => el !== "")
        }

        if (priceIndex > -1) {
            reservationJson['price'] = this.state.modalFieldsProblem[priceIndex].value
        }

        this.state.modalFields.forEach(field => reservationJson[field.name] = field.value)

        return reservationJson

    }

    onSubmitHandler = () => {
        let reservationJson = this.createReservationJson()
        this.props.createReservation(reservationJson).then(result => {
            this.onResetHandler()
            this.populateWithBrands()
            return NOTIFICATION.success("Rezervarea a fost creata cu succes!")
        })
            .catch(() => NOTIFICATION.error("Rezervarea nu a fost creata!"))
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
                    {this.renderFields()}
                    {this.state.problemKnow ?
                        this.state.modalFieldsProblem.map((field, index) => {
                            return <InputGenerator
                                key={index}
                                margin="dense"
                                fullWidth={true}
                                onChange={event => this.onChangeHandler(event)}
                                {...field} />
                        })
                        : ""}
                    <div className="buttonsContainer">
                        <Button onClick={this.onSubmitHandler}>Adauga</Button>
                        <Button onClick={this.onResetHandler}>Reseteaza</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        getBrands: () => dispatch(BRANDS.get()),
        getModelByBrandId: carBrandId => dispatch(MODELS.getModelByBrandId(carBrandId)),
        createReservation: reservation => dispatch(RESERVATION.create(reservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReservation)