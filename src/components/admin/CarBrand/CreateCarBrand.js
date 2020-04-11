import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../../utils/constants'
import * as BRANDS from '../../../redux/actions/brands'

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
        { value: '', type: 'text', label: this.props.language.labels.name, name: 'name' },
        { value: '', type: 'file', InputLabelProps: { shrink: true }, label: this.props.language.labels.logo, name: 'logo' }
    ]

    state = {
        modalFields: this.initialFields
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.type === CONSTANTS.EDIT) this.toggleEditModal(nextProps.carBrandId)
    }

    toggleEditModal = carBrandId => {
        this.props.getBrandById(carBrandId).then(response => {
            let modalFieldsCopy = [...this.state.modalFields].map(field => {
                return ({
                    ...field,
                    value: response[field.name]
                })
            })

            this.setState({
                modalFields: modalFieldsCopy
            })
        })
    }

    createBrandJson = () => {
        let brandJson = {}
        this.state.modalFields.forEach(field => brandJson[field.name] = field.value)
        brandJson['createdAt'] = this.todayValue
        return brandJson

    }

    onAddHandler = () => {
        const brandJson = this.createBrandJson()
        const logoIndex = this.state.modalFields.findIndex(index => index.name === 'logo')

        this.props.createBrand(brandJson).then(createdBrand => {
            if (logoIndex > -1 && this.state.modalFields[logoIndex].files && this.state.modalFields[logoIndex].files.length) {
                let files = Array.from(this.state.modalFields[logoIndex].files)
                const formData = new FormData()
                formData.append('file', files[0])
                return this.props.uploadLogo(createdBrand._id, formData).then(() => {
                    this.onCancelHandler()
                    this.props.getBrands()
                })
            }
            else {
                this.onCancelHandler()
                this.props.getBrands()
            }
        })
    }

    onEditHandler = () => {
        const brandJson = this.createBrandJson()
        const logoIndex = this.state.modalFields.findIndex(index => index.name === 'logo')

        this.props.edit(this.props.carBrandId, brandJson).then(() => {
            if (logoIndex > -1 && this.state.modalFields[logoIndex].files && this.state.modalFields[logoIndex].files.length) {
                let files = Array.from(this.state.modalFields[logoIndex].files)
                const formData = new FormData()
                formData.append('file', files[0])
                return this.props.editLogo(this.props.carBrandId, formData).then(() => {
                    this.onCancelHandler()
                    this.props.getBrands()
                })
            }
            else {
                this.onCancelHandler()
                this.props.getBrands()
            }
        })
    }

    onChangeHandler = event => {

        let currentIndex = this.state.modalFields.findIndex(field => field.name === event.target.name)
        if (currentIndex > -1) {
            let modalFieldsCopy = [...this.state.modalFields].map(field => ({ ...field }))
            if (event.target.type === 'file') {
                modalFieldsCopy[currentIndex].files = event.target.files
                modalFieldsCopy[currentIndex].value = event.target.value
            }
            else {
                modalFieldsCopy[currentIndex].value = event.target.value
            }
            this.setState({ modalFields: modalFieldsCopy })
        }
    }

    renderCarBrandFields = () => {
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
                    title={this.props.type === CONSTANTS.CREATE ? this.props.language.titles.addBrand : this.props.language.titles.editBrand}
                    open={this.props.open}
                    onCancel={() => this.onCancelHandler()}>
                    {this.renderCarBrandFields()}
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
        createBrand: brand => dispatch(BRANDS.create(brand)),
        getBrandById: brandId => dispatch(BRANDS.getById(brandId)),
        edit: (brand, brandId) => dispatch(BRANDS.edit(brand, brandId)),
        uploadLogo: (brandId, form) => dispatch(BRANDS.uploadLogo(brandId, form)),
        editLogo: (brandId, form) => dispatch(BRANDS.editLogo(brandId, form)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCarBrand))