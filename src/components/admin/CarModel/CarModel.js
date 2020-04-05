import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'

import ConfirmationModal from '../../common/ConfirmationDialog'
import CreateModelModal from './CreateCarModel'
import RenderCards from '../../common/RenderCards'

const styles = theme => ({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 19,
        fontSize: 18,
        fontWeight: 500
    }
})

class CarModel extends Component {

    modelToEdit = {}
    modelToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        openConfirmationModal: false,
        modalFields: this.initialFields
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addClicked) {
            this.setState({
                openModal: true,
                modalType: CONSTANTS.CREATE
            })
        }
    }

    deleteModelHandler = () => {
        this.props.deleteModel(this.modelToDelete._id).then(() => {
            this.props.getModels()
            this.setState({ openConfirmationModal: false })
        })
    }

    closeConfirmationModalHandler = () => {
        this.modelToDelete = {}
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
                    onAccept={() => this.deleteModelHandler()} />
                <CreateModelModal carBrandId={this.props.carBrandId} carModelId={this.modelToEdit._id} type={this.state.modalType} getModels={this.props.getModels} open={this.state.openModal} onCancel={() => {
                    this.props.onCloseModal()
                    this.setState({ openModal: false })
                }} />
                <RenderCards
                    displayMainPhoto={false}
                    type={CONSTANTS.MODEL_TYPE}
                    onEdit={item => {
                        this.modelToEdit = item
                        this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                    }}
                    onDelete={item => {
                        this.modelToDelete = item
                        this.setState({ openConfirmationModal: true })
                    }}
                    onClick={item => { }}
                    content={[{ field: 'name', label: 'Model' }]}
                    items={this.props.models} />


            </>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        deleteModel: modelId => dispatch(MODELS.del(modelId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarModel))