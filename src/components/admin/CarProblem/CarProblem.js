import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles, Button, TextField } from '@material-ui/core'
import { AddCircleOutline as AddIcon, Edit, Delete } from '@material-ui/icons'

import ConfirmationModal from '../../common/ConfirmationDialog'
import RenderCards from '../../common/RenderCards'

import * as CONSTANTS from '../../../utils/constants'
import * as NOTIFICATIONS from '../../../utils/notification'
import * as PROBLEMS from '../../../redux/actions/problems'

import CreateCarProblem from './CreateCarProblem'

const styles = theme => ({
    container: {
        width: '100%',
        height: 'calc(100% - 72px)',
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

class CarProblem extends Component {

    problemToEdit = {}
    problemToDelete = {}

    state = {
        openModal: false,
        modalType: CONSTANTS.CREATE,
        problems: [],
        openConfirmationModal: false,
        searchInput: '',
        from: 0,
        limit: 10,
        itemsPerPage: 10,
        count: 0
    }

    componentDidMount() {
        this.getProblems()
    }

    getProblems = () => {
        this.props.getProblems({
            name: this.state.searchInput,
            from: this.state.from,
            limit: this.state.limit,
        }).then(result => {
            this.setState({
                count: result.count,
                problems: result.carProblems
            })
        })
    }

    deleteProblemHandler = () => {
        this.props.delete(this.problemToDelete._id).then(() => {
            NOTIFICATIONS.success(this.props.language.toastr.delete)
            this.getProblems()
            this.setState({ openConfirmationModal: false })
        })
            .catch(() => NOTIFICATIONS.error(this.props.language.toastr.failDelete))
    }

    closeConfirmationModalHandler = () => {
        this.problemToDelete = {}
        this.setState({ openConfirmationModal: false })
    }


    changePageHandler = option => {
        if (option === 'next') {
            const newFrom = this.state.from + this.state.itemsPerPage
            this.setState({ from: newFrom }, this.getProblems)
        }

        if (option === 'prev') {
            const newFrom = this.state.from - this.state.itemsPerPage
            this.setState({ from: newFrom }, this.getProblems)
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
                    onAccept={() => this.deleteProblemHandler()} />
                <CreateCarProblem problemId={this.problemToEdit._id} type={this.state.modalType} getProblems={() => this.getProblems()} open={this.state.openModal} onCancel={() => {
                    this.getProblems()
                    this.setState({ openModal: false })
                }} />
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.problems}</p>
                        </div>
                        <div className={this.props.classes.addContainer}>
                            <Button color="primary" onClick={() => this.setState({ openModal: true, modalType: CONSTANTS.CREATE })}><AddIcon className={this.props.classes.addIcon} /> {this.props.language.buttons.add}</Button>
                            <div className={this.props.classes.searchContainer}><TextField onChange={event => this.setState({ searchInput: event.target.value }, this.getProblems)} placeholder={this.props.language.utils.search} /></div>
                        </div>
                    </div>
                    {this.state.problems && this.state.problems.length ? <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            displayOptions={true}
                            displayMainPhoto={false}
                            type={CONSTANTS.BRAND_TYPE}
                            actions={
                                [
                                    {
                                        icon: <Edit />,
                                        label: 'Edit',
                                        action: item => {
                                            this.problemToEdit = item
                                            this.setState({ openModal: true, modalType: CONSTANTS.EDIT })
                                        }
                                    },
                                    {
                                        icon: <Delete />,
                                        label: 'Delete',
                                        action: item => {
                                            this.problemToDelete = item
                                            this.setState({ openConfirmationModal: true })

                                        }
                                    }
                                ]
                            }
                            onClick={item => { }}
                            content={[
                                {
                                    title: 'General details',
                                    childrens: [{ field: 'name', label: this.props.language.labels.name },
                                    { field: 'difficulty', label: this.props.language.labels.difficulty },
                                    { field: 'price', label: this.props.language.labels.price },
                                    { field: 'steps', label: this.props.language.labels.noSteps, length: true }
                                    ]
                                }]}
                            items={this.state.problems} />
                        <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                            <Button disabled={this.state.from === 0 ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('prev')}>{this.props.language.buttons.prev}</Button>
                            <Button disabled={this.state.count < this.state.itemsPerPage ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('next')}>{this.props.language.buttons.next}</Button>
                        </div>
                    </div> : <h4 style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noResult}</h4>}
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
        getProblems: (options) => dispatch(PROBLEMS.get(options)),
        delete: problemId => dispatch(PROBLEMS.del(problemId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarProblem))