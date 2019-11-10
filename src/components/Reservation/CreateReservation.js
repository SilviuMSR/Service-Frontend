import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import InputGenerator from '../common/InputGenerator'
import * as CONSTANTS from '../../utils/constants'
import * as BRANDS from '../../redux/actions/brands'

import '../../styles/CreateReservation.css'

class CreateReservation extends Component {

    initialFields = [
        { value: '', type: 'text', label: 'Brand masina', name: 'carBrandId' },
        { value: '', type: 'text', label: 'Model masina', name: 'carModelId' },
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
        problemKnow: false,
    }

    componentWillMount() {

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
        }
    }

    onResetHandler = () => {
        this.setState({ modalFields: this.initialFields })
    }


    onSubmitHandler = () => {
        console.log("ON CLICK", this.state.modalFields, this.state.modalFieldsProblem)
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
        getBrands: () => dispatch(BRANDS.get())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReservation)