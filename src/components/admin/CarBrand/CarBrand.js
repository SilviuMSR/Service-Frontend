import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { AddCircleOutline as AddIcon, Edit, Delete } from '@material-ui/icons'

import * as BRAND from '../../../redux/actions/brands'
import * as MODELS from '../../../redux/actions/models'
import * as CONSTANTS from '../../../utils/constants'
import * as NOTIFICATIONS from '../../../utils/notification'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'
import CreateBrandModal from './CreateCarBrand'
import CarModel from '../CarModel/CarModel'

const styles = theme => ({
    container: {
        width: '100%',
        height: 'calc(100% - 72px)'
    },
    containerContent: {
        margin: '24px 100px 24px 100px'
    },
    headersContainer: {
        height: 70,
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    carContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
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
        color: '#606771',
        fontWeight: 500
    },
    searchContainer: {
        paddingLeft: 18,
        paddingTop: 17
    },
    addButton: {
        marginTop: 11,
        marginLeft: 8
    },
    addIcon: {
        paddingRight: 6,
        fontSize: 21
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
        addModel: false,
        searchInput: ''
    }


    componentDidMount() {
        this.getBrands()
    }

    getBrands = () => {
        this.props.getBrands({ name: this.state.searchInput }).then(result => {
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
            NOTIFICATIONS.success(this.props.language.toastr.delete)
            this.getBrands()
            this.setState({ openConfirmationModal: false, selectedBrandId: null })
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failDelete))
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
                    text={this.props.language.utils.delete}
                    cancelButtonText={this.props.language.buttons.cancel}
                    acceptButtonText={this.props.language.buttons.delete}
                    open={this.state.openConfirmationModal}
                    onClose={this.closeConfirmationModalHandler}
                    onCancel={this.closeConfirmationModalHandler}
                    onAccept={() => this.deleteBrandHandler()} />
                <CreateBrandModal carBrandId={this.brandToEdit._id} type={this.state.modalType} getBrands={() => this.getBrands()} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.brands}</p>
                            <div className={this.props.classes.addButton}>
                                <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}><AddIcon className={this.props.classes.addIcon} /> {this.props.language.buttons.add}</Button>
                            </div>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <div className={this.props.classes.titleContainer}>
                                <p className={this.props.classes.titleText}>{this.props.language.titles.models}</p>
                                <div className={this.props.classes.addButton}>
                                    <Button color="primary" onClick={() => this.handleModelEvents(true)}><AddIcon className={this.props.classes.addIcon} /> {this.props.language.buttons.add}</Button>
                                </div>
                            </div>
                            <div className={this.props.classes.searchContainer}>
                                <TextField onChange={event => this.setState({ searchInput: event.target.value }, this.getBrands)} placeholder={this.props.language.utils.search} />
                            </div>
                        </div>

                    </div>
                    <div className={this.props.classes.carContainer}>
                        {this.state.brands && this.state.brands.length ? <div style={{ flex: 2, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                            <RenderCards
                                displayOptions={true}
                                displayMainPhoto={true}
                                extraWidth={true}
                                type={CONSTANTS.BRAND_TYPE}
                                actions={
                                    [
                                        {
                                            icon: <Edit />,
                                            label: 'Edit',
                                            action: item => {
                                                this.brandToEdit = item
                                                this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                            }
                                        },
                                        {
                                            icon: <Delete />,
                                            label: 'Delete',
                                            action: item => {
                                                this.brandToDelete = item
                                                this.setState({ openConfirmationModal: true })

                                            }
                                        }
                                    ]
                                }
                                onClick={item => this.onSelectBrand(item)}
                                content={[
                                    {
                                        title: 'General details',
                                        childrens: [{ field: 'name', label: this.props.language.labels.brand }]
                                    }
                                ]}
                                items={this.state.brands} />
                        </div> : <h4 style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noResult}</h4>}
                        {this.state.brands && this.state.brands.length ? <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                            {this.state.selectedBrandId ? <CarModel addClicked={this.state.addModel} onCloseModal={() => this.handleModelEvents(false)} carBrandId={this.state.selectedBrandId} models={this.state.associatedModels} getModels={() => this.getAssociatedModels()} /> : <p style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noBrandSelected}</p>}
                        </div> : null}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        getBrands: options => dispatch(BRAND.get(options)),
        getModelsByBrandId: (brandId) => dispatch(MODELS.getModelByBrandId(brandId)),
        deleteBrand: brandId => dispatch(BRAND.del(brandId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarBrand))