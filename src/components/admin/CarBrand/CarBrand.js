import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import * as BRAND from '../../../redux/actions/brands'
import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'
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
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    carContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    addContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 19
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 19,
        fontSize: 18,
        fontWeight: 500
    },
    titleText: {
        color: '#1976d2'
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
        modalFields: this.initialFields,
        addModel: false
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

    onSelectBrand = brand => {
        this.getAssociatedModels(brand._id)
    }

    handleModelEvents = value => {
        if (this.state.selectedBrandId) {
            this.setState({
                addModel: value
            })
        }
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
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>CAR BRANDS</p>
                            <Button onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <div className={this.props.classes.titleContainer}>
                                <p className={this.props.classes.titleText}>ASSOCIATED MODELS</p>
                                <Button onClick={() => this.handleModelEvents(true)}>ADD</Button>
                            </div>
                            <TextField placeholder="Search..." />
                        </div>

                    </div>
                    <div className={this.props.classes.carContainer}>
                        <div style={{ flex: 1, backgroundColor: '#F8F8F8', margin: 20 }}>
                            <RenderCards
                                displayMainPhoto={true}
                                type={CONSTANTS.BRAND_TYPE}
                                onEdit={item => {
                                    this.brandToEdit = item
                                    this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                }}
                                onDelete={item => {
                                    this.brandToDelete = item
                                    this.setState({ openConfirmationModal: true })
                                }}
                                onClick={item => this.onSelectBrand(item)}
                                content={[{ field: 'name', label: 'Brand' }]}
                                items={this.state.brands} />
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#F8F8F8', margin: 20 }}>
                            {this.state.selectedBrandId ? <CarModel addClicked={this.state.addModel} onCloseModal={() => this.handleModelEvents(false)} carBrandId={this.state.selectedBrandId} models={this.state.associatedModels} getModels={() => this.getAssociatedModels()} /> : <p>Select brand</p>}
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