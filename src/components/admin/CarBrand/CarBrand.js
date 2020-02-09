import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import * as BRAND from '../../../redux/actions/brands'
import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'

import ConfirmationModal from '../../common/ConfirmationDialog'
import CreateBrandModal from './CreateCarBrand'
import CarModel from '../CarModel/CarModel'

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
    carContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})

class CarBrand extends Component {

    brandToEdit = {}
    brandToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        brands: [],
        openConfirmationModal: false,
        associatedModels: [],
        selectedBrandId: null,
        modalFields: this.initialFields
    }

    componentDidMount() {
        this.getBrands()
    }

    getBrands = () => {
        this.props.getBrands().then(result => {
            this.setState({
                brands: result.brands
            })
        })
    }

    getAssociatedModels = brandId => {
        this.props.getModelsByBrandId(brandId || this.state.selectedBrandId).then(models => {
            this.setState({ associatedModels: models, selectedBrandId: brandId ? brandId : this.state.selectedBrandId })
        })
    }

    deleteBrandHandler = () => {
        this.props.deleteBrand(this.brandToDelete._id).then(() => {
            this.getBrands()
            this.setState({ openConfirmationModal: false, selectedBrandId: null })
        })
    }

    closeConfirmationModalHandler = () => {
        this.brandToDelete = {}
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
                    onAccept={() => this.deleteBrandHandler()} />
                <CreateBrandModal carBrandId={this.brandToEdit._id} type={this.state.modalType} getBrands={() => this.getBrands()} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.addContainer}><Button onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button></div>
                        <div className={this.props.classes.searchContainer}><TextField placeholder="Search..." /></div>
                    </div>
                    <div className={this.props.classes.carContainer}>
                        <div style={{ flex: 1 }}>
                            {this.state.brands.map(brand => {
                                return (
                                    <div>
                                        <span onClick={() => {
                                            this.getAssociatedModels(brand._id)
                                        }}>{brand.name}</span>
                                        <Edit onClick={() => {
                                            this.brandToEdit = brand
                                            this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                        }} />
                                        <Delete onClick={() => {
                                            this.brandToDelete = brand
                                            this.setState({ openConfirmationModal: true })
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ flex: 1 }}>
                            {this.state.selectedBrandId ? <CarModel carBrandId={this.state.selectedBrandId} models={this.state.associatedModels} getModels={() => this.getAssociatedModels()} /> : <p>Select brand</p>}
                        </div>
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
        getBrands: () => dispatch(BRAND.get()),
        getModelsByBrandId: (brandId) => dispatch(MODELS.getModelByBrandId(brandId)),
        deleteBrand: brandId => dispatch(BRAND.del(brandId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarBrand))