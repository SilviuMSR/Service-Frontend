import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf'
import localConfig from '../../config/local.json'

import { withStyles, TextField, Button } from '@material-ui/core'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import RenderCards from '../common/RenderCards'
import ReservationDetails from './ReservationDetails'

import * as RESERVATIONS from '../../redux/actions/reservation'
import * as CONSTANTS from '../../utils/constants'
import * as NOTIFICATION from '../../utils/notification'

pdfjs.GlobalWorkerOptions.workerSrc = `${localConfig.frontend}/pdf.worker.js`

const styles = theme => ({
    container: {
        width: '100%',
        height: 'calc(100% - 42px)'
    },
    containerContent: {
        margin: '24px 100px 24px 100px'
    },
    headersContainer: {
        height: 30,
        width: 250,
        margin: '10px 100px 0px auto',
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'content-box'
    },
    options: {
        paddingTop: 3,
        paddingRight: '10px',
        cursor: 'pointer'
    },
    optionsIcon: {
        paddingRight: '10px',
        paddingLeft: '10px',
        marginTop: '5px',
        color: '#9ea0a5'
    },
    optionText: {
        fontSize: 15,
        color: '#9ea0a5',
        fontWeight: 500
    },
    selectedOption: {
        color: '#1976d2'
    },
    problemsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filesContainer: {
        display: 'flex',
    },
    problemsList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 18,
        borderRight: '1px solid rgba(0,0,0,0.1)',
        paddingRight: 8
    },
    problemSteps: {
        flex: 1
    },
    problem: {
        display: 'flex',
        flexDirection: 'column'
    },
    rightArrowContainer: {
        marginLeft: 'auto',
        paddingRight: 18,
        color: "#1976d2"
    },
    problemWrapper: {
        '&:hover': {
            border: '1px solid #1976d2',
            borderRadius: 15
        },
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingRight: 5,
        marginTop: 5,
        fontSize: 13,
        border: '1px solid transparent',
        cursor: 'pointer'
    },
    fileWrapper: {
        '&:hover': {
            border: '1px solid #1976d2',
            borderRadius: 15
        },
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingRight: 5,
        marginTop: 5,
        fontSize: 13,
        border: '1px solid transparent',
        cursor: 'pointer'
    },
    selectedProblem: {
        border: '1px solid #1976d2',
        borderRadius: 15
    },
    stepsContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 18,
        paddingLeft: 12,
        fontSize: 13
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
    titleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 19,
        fontSize: 18,
        fontWeight: 500
    },
    headersContainerEmployee: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    titleText: {
        color: '#606771',
        fontWeight: 500
    },
    searchContainer: {
        paddingRight: 24,
        paddingTop: 7
    }

})

class Reservations extends Component {

    state = {
        reservations: [],
        renderPage: false,
        selectedOption: '',
        showFiles: false,
        showProblems: false,
        currentProblem: null,
        currentFile: null,
        currentReservation: null,
        selectedReservation: null,
        openReservationDetails: false,
        searchInput: '',
        from: 0,
        limit: 10,
        itemsPerPage: 10,
        count: 0
    }

    componentDidMount() {
        this.setState({ selectedOption: this.props.login.position.toLowerCase() === 'admin' ? CONSTANTS.RENDER_RESERVATION_ADMIN : CONSTANTS.RENDER_RESERVATION_EMPLOYEE }, () => this.handlerReservations())
    }

    getReservationById = reservationId => {
        this.props.getReservationById(reservationId).then(result => this.setState({ currentReservation: result }))
    }

    handlerReservations = () => {
        if (this.props.login.position.toLowerCase() === 'admin') {
            this.getReservationsHandler({ name: this.state.searchInput, from: this.state.from, limit: this.state.limit })
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE) {
            this.getReservationsHandler({ employee: true, name: this.state.searchInput, from: this.state.from, limit: this.state.limi })
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL) {
            this.getByEmployeeIdHandler(this.props.login.userId)
        }
    }

    getByEmployeeIdHandler = employeeId => {
        this.props.getByEmployeeId(employeeId).then(res => this.setState({ reservations: res.reservations, renderPage: true, openReservationDetails: false }))
    }

    getReservationsHandler = (options) => {
        this.props.getReservations(options).then(res => this.setState({ reservations: res.reservations, count: res.count, renderPage: true, openReservationDetails: false }))
    }

    generateReservationMessageHandler = status => {
        switch (status) {
            case CONSTANTS.RESERVATION_ACCEPTED:
                return NOTIFICATION.success(this.props.language.toastr.reservationAccepted)
            case CONSTANTS.RESERVATION_DECLINED:
                return NOTIFICATION.error(this.props.language.toastr.reservationDeclined)
            case CONSTANTS.RESERVATION_IN_PROGRESS:
                return NOTIFICATION.success(this.props.language.toastr.reservationInProgress)
            case CONSTANTS.RESERVATION_DONE:
                return NOTIFICATION.success(this.props.language.toastr.reservationDone)
        }
    }

    modifyStatusHandler = (reservationId, newStatus, userId) => {
        let newReservation = {
            userId: userId,
            reservationStatus: newStatus
        }

        this.props.modifyStatus(reservationId, newReservation).then(() => {
            this.generateReservationMessageHandler(newStatus)
            this.handlerReservations()
        })
    }

    selectOptionHandler = option => {
        this.setState({ selectedOption: option }, () => {
            this.handlerReservations()
        })
    }

    onProblemClickHandler = problem => {
        this.setState({ currentProblem: problem })
    }

    onFileClickHandler = file => {
        this.setState({ currentFile: file })
    }

    onFileLoadSuccess = () => {
        this.setState({ pdfPage: 1 })
    }

    changePageHandler = option => {
        if (option === 'next') {
            const newFrom = this.state.from + this.state.itemsPerPage
            this.setState({ from: newFrom }, this.handlerReservations)
        }

        if (option === 'prev') {
            const newFrom = this.state.from - this.state.itemsPerPage
            this.setState({ from: newFrom }, this.handlerReservations)
        }
    }

    renderModalContentHandler = () => {
        if (this.state.showFiles) {
            return (
                <div className={this.props.classes.filesContainer}>
                    <div className={this.props.classes.problemsList}>
                        {this.state.currentReservation.file.length ? this.state.currentReservation.file.map(file => {
                            return (
                                <div onClick={() => this.onFileClickHandler(file)} className={`${this.state.currentFile ? this.state.currentFile._id === file._id ? this.props.classes.selectedProblem : "" : ""} ${this.props.classes.fileWrapper}`}>
                                    <span>{file.customName}</span>
                                    <div className={this.props.classes.rightArrowContainer}>
                                        <ChevronRightIcon />
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className={this.props.classes.problemSteps}>
                        <div>
                            {this.state.currentFile ? <Document
                                file={`${CONSTANTS.INVOICES_URL}${this.state.currentFile.originalName}`}
                                onLoadSuccess={this.onFileLoadSuccess}
                            >
                                <Page pageNumber={this.state.pdfPage} />
                            </Document> : null}
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.showProblems) {
            return (
                <div className={this.props.classes.problemsContainer}>
                    <div className={this.props.classes.problemsList}>
                        {this.state.currentReservation.problem.map(pr => {
                            return (
                                <div onClick={() => this.onProblemClickHandler(pr)} className={`${this.state.currentProblem ? this.state.currentProblem._id === pr._id ? this.props.classes.selectedProblem : "" : ""} ${this.props.classes.problemWrapper}`}>
                                    <div className={this.props.classes.problem}>
                                        <span>{pr.name}</span>
                                        <span>{pr.price} {this.props.language.utils.ron}</span>
                                    </div>
                                    <div className={this.props.classes.rightArrowContainer}>
                                        <ChevronRightIcon />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={this.props.classes.problemSteps}>
                        {this.state.currentProblem ? this.state.currentProblem.steps.map((step, index) => {
                            return (
                                <div className={this.props.classes.stepsContainer}>
                                    <span>{index + 1}.&nbsp;{step}</span>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            )
        }

        return null
    }

    render() {
        const tabsAdmin = [CONSTANTS.DETAILS_TAB, CONSTANTS.PROBLEMS_TAB, CONSTANTS.INVOICES_TAB]
        const tabsEmployee = [CONSTANTS.DETAILS_TAB, CONSTANTS.PROBLEMS_TAB]

        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.titleContainer}>
                            <p className={this.props.classes.titleText}>{this.props.language.titles.reservations}</p>
                        </div>
                        {this.props.login.position.toLowerCase() !== 'admin' ? <div className={this.props.classes.headersContainerEmployee}>
                            <div className={this.props.classes.optionsIcon}><VisibilityOutlinedIcon /></div>
                            <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_EMPLOYEE)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>{this.props.language.titles.reservations}</span></div>
                            <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_PERSONAL)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>{this.props.language.titles.personalReservations}</span></div>
                        </div> : <>
                                <div className={this.props.classes.searchContainer}>
                                    <TextField onChange={event => this.setState({ searchInput: event.target.value }, this.handlerReservations)} placeholder={this.props.language.utils.search} />
                                </div></>}
                    </div>
                    <div className={this.props.classes.containerContent}>
                        <ReservationDetails
                            tabs={this.props.login.position.toLowerCase() === 'admin' ? tabsAdmin : tabsEmployee}
                            open={this.state.openReservationDetails}
                            item={this.state.selectedReservation}
                            generateInvoice={reservationId => {
                                this.props.generateInvoice(reservationId).then(() => this.handlerReservations())
                            }}
                            modifyStatus={this.modifyStatusHandler}
                            onCancel={() => this.setState({ openReservationDetails: false })}
                        />
                    </div>
                    {this.state.reservations && this.state.reservations.length ? <div style={{ flex: 1, maxHeight: 'calc(100% - 76px)', overflowY: 'auto', backgroundColor: '#F8F8F8', margin: '20px 19px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '1px 1px rgba(0,0,0,0.1)' }}>
                        <RenderCards
                            tooltipMessage={this.props.language.tooltip.reservationDetails}
                            displayOptions={false}
                            displayMainPhoto={true}
                            type={CONSTANTS.RESERVATION_TYPE}
                            onClick={item => { this.setState({ selectedReservation: item, openReservationDetails: true }) }}
                            content={[
                                {
                                    title: 'General details',
                                    childrens: [
                                        { populate: 'carBrandId', field: 'name', label: this.props.language.labels.brand },
                                        { populate: 'carModelId', field: 'name', label: this.props.language.labels.model },
                                        { field: 'price', label: this.props.language.labels.price },
                                        { field: 'clientName', label: this.props.language.labels.clientName }]
                                },
                                {
                                    title: this.props.language.labels.status,
                                    childrens: [
                                        { field: 'reservationStatus' }
                                    ]
                                }]}
                            items={this.state.reservations} />
                        <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                            <Button disabled={this.state.from === 0 ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('prev')}>{this.props.language.buttons.prev}</Button>
                            <Button disabled={this.state.count < this.state.itemsPerPage ? true : false} style={{ margin: 8 }} color="secondary" onClick={() => this.changePageHandler('next')}>{this.props.language.buttons.next}</Button>
                        </div>
                    </div> : <h4 style={{ marginLeft: 19, color: '#606771' }}>{this.props.language.utils.noResult}</h4>}
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login,
    language: state.language.i18n
})

const mapDispatchToProps = dispatch => {
    return {
        generateInvoice: reservationId => dispatch(RESERVATIONS.generateInvoice(reservationId)),
        getReservations: options => dispatch(RESERVATIONS.get(options)),
        getReservationById: reservationId => dispatch(RESERVATIONS.getById(reservationId)),
        getByEmployeeId: employeeId => dispatch(RESERVATIONS.getByEmployeeId(employeeId)),
        modifyStatus: (reservationId, newReservation) => dispatch(RESERVATIONS.edit(reservationId, newReservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reservations))