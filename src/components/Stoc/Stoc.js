import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'

import { mapToDropdownSelector, mapToMultipleSelector, findIndexInArray } from '../../utils/apiFunctions'
import * as CONSTANTS from '../../utils/constants'
import * as BRANDS from '../../redux/actions/brands'
import * as MODELS from '../../redux/actions/models'

import InputGenerator from '../common/InputGenerator'
import SimpleModal from '../common/SimpleModal'

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

class Stoc extends Component {

    initialFields = [
        { value: '', type: 'dropdownSelector', label: 'Brand', name: 'carBrandId', options: [] },
        { value: '', type: 'dropdownSelector', label: 'Model', name: 'carModelId', options: [] },
        { value: '', type: 'text', label: 'Nume', name: 'name' },
        { value: '', type: 'text', label: 'Price', name: 'price' },
        { value: 0, type: "number", label: "Quantity", name: 'no' }
    ]

    state = {
        openModal: false,
        modalFields: this.initialFields
    }

    populateWithBrands = () => {
        this.props.getBrands().then(brands => {
            let brandIndex = findIndexInArray(this.state.modalFields, 'carBrandId')
            if (brandIndex > -1) {
                let modalFieldsCopy = [...this.state.modalFields].map(el => ({ ...el }))
                modalFieldsCopy[brandIndex].options = mapToDropdownSelector(brands.brands)
                this.setState({ modalFields: modalFieldsCopy, openModal: true })
            }
        })
    }

    onAddHandler = () => {
        this.setState({ openModal: false })
    }

    onChangeHandler = event => {

        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
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

    renderStocModalFields = () => {
        return this.state.modalFields.map((field, index) => {
            return <InputGenerator
                key={index}
                margin="dense"
                fullWidth={true}
                onChange={event => this.onChangeHandler(event)}
                {...field} />
        })
    }

    render() {
        return (
            <>
                <SimpleModal acceptButtonText="Adauga" cancelButtonText="Anuleaza" onAccept={this.onAddHandler} maxWidth={"md"} title={"Adauga stoc"} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })}>
                    {this.renderStocModalFields()}
                </SimpleModal>
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.addContainer}><Button onClick={this.populateWithBrands}>ADD</Button></div>
                        <div className={this.props.classes.searchContainer}><TextField placeholder="Search..." /></div>
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
        getBrands: () => dispatch(BRANDS.get()),
        getModelByBrandId: carBrandId => dispatch(MODELS.getModelByBrandId(carBrandId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stoc))