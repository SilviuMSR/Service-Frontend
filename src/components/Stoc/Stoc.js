import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import ConfirmationModal from '../common/ConfirmationDialog'
import * as STOCK from '../../redux/actions/stocks'
import * as CONSTANTS from '../../utils/constants'

import CreateStock from './CreateStock'

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
            this.getStocks()
            this.setState({ openConfirmationModal: false })
        })
    }

    closeConfirmationModalHandler = () => {
        this.stockToDelete = {}
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
                    onAccept={() => this.deleteStockHandler()} />
                <CreateStock stockId={this.stockToEdit._id} type={this.state.modalType} getStocks={() => this.getStocks()} open={this.state.openModal} onCancel={() => this.setState({ openModal: false })} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.addContainer}><Button onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}>ADD</Button></div>
                        <div className={this.props.classes.searchContainer}><TextField placeholder="Search..." /></div>
                    </div>
                    <div>
                        {this.state.stocks.map(stock => {
                            return (
                                <div onClick={() => {
                                    this.stockToEdit = stock
                                    this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                }}>
                                    {stock.name}
                                    <Delete onClick={() => {
                                        this.stockToDelete = stock
                                        this.setState({ openConfirmationModal: true })
                                    }} />
                                </div>
                            )
                        })}
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
        getStocks: () => dispatch(STOCK.get()),
        deleteStock: stockId => dispatch(STOCK.del(stockId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stoc))