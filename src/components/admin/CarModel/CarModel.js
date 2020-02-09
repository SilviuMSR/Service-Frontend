import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'

import ConfirmationModal from '../../common/ConfirmationDialog'
import CreateModelModal from './CreateCarModel'

const styles = theme => ({

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
                <CreateModelModal carBrandId={this.props.carBrandId} carModelId={this.modelToEdit._id} type={this.state.modalType} getModels={this.props.getModels} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <Button onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button>
                {this.props.models.map(model => {
                    return (
                        <div>

                            <span>{model.name}</span>
                            <Edit onClick={() => {
                                this.modelToEdit = model
                                this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                            }} />
                            <Delete onClick={() => {
                                this.modelToDelete = model
                                this.setState({ openConfirmationModal: true })
                            }} />
                        </div>
                    )
                })}

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