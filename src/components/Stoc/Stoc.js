import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { AddCircleOutline as AddIcon } from '@material-ui/icons'
import { Delete } from '@material-ui/icons'

import ConfirmationModal from '../common/ConfirmationDialog'
import RenderCards from '../common/RenderCards'

import * as STOCK from '../../redux/actions/stocks'
import * as CONSTANTS from '../../utils/constants'
import * as NOTIFICATIONS from '../../utils/notification'

import CreateStock from './CreateStock'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    containerContent: {
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
        paddingTop: 7
    },
    addIcon: {
        paddingRight: 6,
        fontSize: 21
    }
})

class Stoc extends Component {

    stockToEdit = {}
    stockToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        stocks: [],
        openConfirmationModal: false,
        modalFields: this.initialFields
    }

    componentDidMount() {
        this.getStocks()
    }

    getStocks = () => {
        this.props.getStocks().then(result => {
            this.setState({
                stocks: result.pieces
            })
        })
    }

    deleteStockHandler = () => {
        this.props.deleteStock(this.stockToDelete._id).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.delete)
            this.getStocks()
            this.setState({ openConfirmationModal: false })
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failDelete))
    }

    closeConfirmationModalHandler = () => {
        this.stockToDelete = {}
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
                    onAccept={() => this.deleteStockHandler()} />
                <CreateStock stockId={this.stockToEdit._id} type={this.state.modalType} getStocks={() => this.getStocks()} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.stock}</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}><AddIcon className={this.props.classes.addIcon} /> {this.props.language.buttons.add}</Button>
                            <div className={this.props.classes.searchContainer}>
                                <TextField placeholder={this.props.language.utils.search} />
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#F8F8F8', margin: '20px 19px', flex: 1, border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            displayOptions={true}
                            displayMainPhoto={false}
                            type={CONSTANTS.BRAND_TYPE}
                            onEdit={item => {
                                this.stockToEdit = item
                                this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                            }}
                            onDelete={item => {
                                this.stockToDelete = item
                                this.setState({ openConfirmationModal: true })
                            }}
                            onClick={item => { }}
                            content={[{ populate: 'carBrandId', field: 'name', label: 'Brand' }, { populate: 'carModelId', field: 'name', label: 'Model' }, { field: 'name', label: 'Name' }, { field: 'price', label: 'Price' }, { field: 'no', label: 'Quantity' }]}
                            items={this.state.stocks} />
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
        getStocks: () => dispatch(STOCK.get()),
        deleteStock: stockId => dispatch(STOCK.del(stockId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stoc))