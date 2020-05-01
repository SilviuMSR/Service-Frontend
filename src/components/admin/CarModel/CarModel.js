import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'
import * as NOTIFICATIONS from '../../../utils/notification'

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
            NOTIFICATIONS.success(this.props.language.toastr.delete)
            this.props.getModels()
            this.setState({ openConfirmationModal: false })
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failDelete))
    }

    closeConfirmationModalHandler = () => {
        this.modelToDelete = {}
        this.setState({ openConfirmationModal: false })
    }

    render() {
        return (
            <>
                <ConfirmationModal
                    text={this.props.language.utils.delete}
                    cancelButtonText={this.props.language.buttons.cancel}
                    acceptButtonText={this.props.language.buttons.delete}
                    open={this.state.openConfirmationModal}
                    onClose={this.closeConfirmationModalHandler}
                    onCancel={this.closeConfirmationModalHandler}
                    onAccept={() => this.deleteModelHandler()} />
                <CreateModelModal carBrandId={this.props.carBrandId} carModelId={this.modelToEdit._id} type={this.state.modalType} getModels={this.props.getModels} open={this.state.openModal} onCancel={() => {
                    this.props.onCloseModal()
                    this.setState({ openModal: false })
                }} />
                {this.props.models && this.props.models.length ? <RenderCards
                    displayOptions={true}
                    displayMainPhoto={false}
                    type={CONSTANTS.MODEL_TYPE}
                    actions={
                        [
                            {
                                icon: <Edit />,
                                label: 'Edit',
                                action: item => {
                                    this.modelToEdit = item
                                    this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                }
                            },
                            {
                                icon: <Delete />,
                                label: 'Delete',
                                action: item => {
                                    this.modelToDelete = item
                                    this.setState({ openConfirmationModal: true })

                                }
                            }
                        ]
                    }
                    onClick={item => { }}
                    content={[
                        {
                            title: 'General details',
                            childrens: [{ field: 'name', label: this.props.language.labels.model }]
                        }
                    ]}
                    items={this.props.models} />
                    : <p style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noResult}</p>}


            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        deleteModel: modelId => dispatch(MODELS.del(modelId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarModel))