import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../../utils/constants'
import * as MODELS from '../../../redux/actions/models'
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
    }
})

class CreateCarBrand extends Component {

    todayValue = moment().format(CONSTANTS.INPUT_TYPE_DATE_FORMAT)

    initialFields = [
        { value: '', type: 'text', label: this.props.language.labels.name, name: 'name' }
    ]

    state = {
        modalFields: this.initialFields
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.type === CONSTANTS.EDIT) this.toggleEditModal(nextProps.carModelId)
    }

    toggleEditModal = carModelId => {
        this.props.getModelById(carModelId).then(response => {
            let modalFieldsCopy = [...this.state.modalFields].map(field => {
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

    createModelJson = () => {
        let modelJson = {}

        this.state.modalFields.forEach(field => modelJson[field.name] = field.value)
        modelJson['createdAt'] = this.todayValue
        modelJson['carBrandId'] = this.props.carBrandId

        return modelJson

    }

    onAddHandler = () => {
        this.props.createModel(this.createModelJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.add)
            this.onCancelHandler()
            this.props.getModels()
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failAdd))
    }

    onEditHandler = () => {
        this.props.edit(this.props.carModelId, this.createModelJson()).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.edit)
            this.onCancelHandler()
            this.props.getModels()
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

    renderCarModelFields = () => {
        return (
            <div style={{ padding: 16 }}>{this.state.modalFields.map((field, index) => {
                return <InputGenerator
                    key={index}
                    margin="dense"
                    fullWidth={true}
                    onChange={event => this.onChangeHandler(event)}
                    {...field} />
            })}</div>)
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
                    acceptButtonText={this.props.language.buttons.save}
                    cancelButtonText={this.props.language.buttons.cancel}
                    onAccept={this.props.type === CONSTANTS.CREATE ? this.onAddHandler : this.onEditHandler}
                    maxWidth={"md"}
                    title={this.props.type === CONSTANTS.CREATE ? this.props.language.titles.addModel : this.props.language.titles.editModel}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderCarModelFields()}
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
        createModel: model => dispatch(MODELS.create(model)),
        getModelById: modelId => dispatch(MODELS.getById(modelId)),
        edit: (model, modelId) => dispatch(MODELS.edit(model, modelId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCarBrand))