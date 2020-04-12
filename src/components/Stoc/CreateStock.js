import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles } from '@material-ui/core'

import { mapToDropdownSelector, findIndexInArray } from '../../utils/apiFunctions'

import * as CONSTANTS from '../../utils/constants'
import * as BRANDS from '../../redux/actions/brands'
import * as MODELS from '../../redux/actions/models'
import * as STOCK from '../../redux/actions/stocks'
import * as NOTIFICATIONS from '../../utils/notification'

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

class CreateStock extends Component {

    todayValue = moment().format(CONSTANTS.INPUT_TYPE_DATE_FORMAT)

    initialFields = [
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.brand, name: 'carBrandId', options: [] },
        { value: '', type: 'dropdownSelector', label: this.props.language.labels.model, name: 'carModelId', options: [] },
        { value: '', type: 'text', label: this.props.language.labels.name, name: 'name' },
        { value: '', type: 'text', label: this.props.language.labels.price, name: 'price' },
        { value: 0, type: "number", label: this.props.language.labels.quantity, name: 'no' }
    ]

    state = {
        modalFields: this.initialFields,
        availableBrands: [],
        waitForBrands: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.type === CONSTANTS.CREATE) this.populateWithBrands()
        if (nextProps.open && nextProps.type === CONSTANTS.EDIT) this.toggleEditModal(nextProps.stockId)
    }

    toggleEditModal = stockId => {
        this.populateWithBrands().then(() => {
            this.props.getStockById(stockId).then(response => {
                let modalFieldsCopy = [...this.state.modalFields].map(field => {
                    if (field.type === 'dropdownSelector') {
                        if (field.name === 'carModelId') {
                            this.props.getModelByBrandId(response['carBrandId']).then(result => {
                                let carModel = {
                                    ...field,
                                    value: result[0]._id,
                                    options: mapToDropdownSelector(result)
                                }
                                modalFieldsCopy[1] = carModel
                                this.setState({
                                    modalFields: modalFieldsCopy
                                })
                            })
                        }
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
                NOTIFICATIONS.error(this.props.language.toastr.notFound)
            })
        })
    }

    populateWithBrands = () => {
        return this.props.getBrands().then(brands => {
            let brandIndex = findIndexInArray(this.state.modalFields, 'carBrandId')
            if (brandIndex > -1) {
                let modalFieldsCopy = [...this.state.modalFields].map(el => ({ ...el }))
                modalFieldsCopy[brandIndex].options = mapToDropdownSelector(brands.brands)
                this.setState({ modalFields: modalFieldsCopy, openModal: true, availableBrands: brands.brand })
            }
        })
    }

    createStockJson = () => {
        let stockJson = {}

        this.state.modalFields.forEach(field => stockJson[field.name] = field.value)
        stockJson['createdAt'] = this.todayValue

        return stockJson

    }

    onAddHandler = () => {
        this.props.createStock(this.createStockJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.add)
            this.onCancelHandler()
            this.props.getStocks()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failAdd))
    }

    onEditHandler = () => {
        this.props.edit(this.props.stockId, this.createStockJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.edit)
            this.onCancelHandler()
            this.props.getStocks()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failEdit))
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

    onCancelHandler = () => {
        this.props.onCancel()
        this.setState({
            modalFields: this.initialFields
        })
    }

    render() {
        return (
            <>
                <SimpleModal
                    acceptButtonText={this.props.language.buttons.add}
                    cancelButtonText={this.props.language.buttons.cancel}
                    onAccept={this.props.type === CONSTANTS.CREATE ? this.onAddHandler : this.onEditHandler}
                    maxWidth={"md"}
                    title={this.props.type === CONSTANTS.CREATE ? this.props.language.titles.addStock : this.props.language.titles.editStock}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderStocModalFields()}
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
        getBrands: () => dispatch(BRANDS.get()),
        getModelByBrandId: carBrandId => dispatch(MODELS.getModelByBrandId(carBrandId)),
        createStock: stock => dispatch(STOCK.create(stock)),
        getStockById: stockId => dispatch(STOCK.getById(stockId)),
        edit: (stock, stockId) => dispatch(STOCK.edit(stock, stockId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateStock))