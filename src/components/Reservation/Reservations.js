import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf'
import localConfig from '../../config/local.json'

import { withStyles } from '@material-ui/core'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import RenderItems from '../common/RenderExpandItem'
import SimpleModal from '../common/SimpleModal'

import * as RESERVATIONS from '../../redux/actions/reservation'
import * as CONSTANTS from '../../utils/constants'
import * as NOTIFICATION from '../../utils/notification'

pdfjs.GlobalWorkerOptions.workerSrc = `${localConfig.frontend}/pdf.worker.js`

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
        paddingRight: '10px',
        flex: 1,
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
        currentReservation: null
    }

    componentDidMount() {
        this.setState({ selectedOption: this.props.login.position === 'admin' ? CONSTANTS.RENDER_RESERVATION_ADMIN : CONSTANTS.RENDER_RESERVATION_EMPLOYEE }, () => this.handlerReservations())
    }

    getReservationById = reservationId => {
        this.props.getReservationById(reservationId).then(result => this.setState({ currentReservation: result }))
    }

    handlerReservations = () => {
        if (this.props.login.position === 'admin') {
            this.getReservationsHandler()
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE) {
            this.getReservationsHandler({ employee: true })
        }
        else if (this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL) {
            this.getByEmployeeIdHandler(this.props.login.userId)
        }
    }

    getByEmployeeIdHandler = employeeId => {
        this.props.getByEmployeeId(employeeId).then(res => this.setState({ reservations: res.reservations, renderPage: true }))
    }

    getReservationsHandler = (options) => {
        this.props.getReservations(options).then(res => this.setState({ reservations: res.reservations, renderPage: true }))
    }

    generateReservationMessageHandler = status => {
        switch (status) {
            case CONSTANTS.RESERVATION_ACCEPTED:
                return NOTIFICATION.success("Reservation was successfully accepted!")
            case CONSTANTS.RESERVATION_DECLINED:
                return NOTIFICATION.error("Reservation was declined!")
            case CONSTANTS.RESERVATION_IN_PROGRESS:
                return NOTIFICATION.success("Reservation was added to your list!")
            case CONSTANTS.RESERVATION_DONE:
                return NOTIFICATION.success("Reservation was completed!")
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
                                file={`http://localhost:9000/static/invoices/${this.state.currentFile.originalName}`}
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
                                        <span>{pr.price} RON</span>
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
        if (this.state.renderPage) {
            return (
                <div className={this.props.classes.container}>
                    {this.props.login.position !== 'admin' ? <div className={this.props.classes.headersContainer}>
                        <div className={this.props.classes.optionsIcon}><VisibilityOutlinedIcon /></div>
                        <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_EMPLOYEE)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_EMPLOYEE ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>RESERVATIONS</span></div>
                        <div onClick={() => this.selectOptionHandler(CONSTANTS.RENDER_RESERVATION_PERSONAL)} className={this.props.classes.options}><span className={`${this.state.selectedOption === CONSTANTS.RENDER_RESERVATION_PERSONAL ? this.props.classes.selectedOption : ""} ${this.props.classes.optionText}`}>PERSONAL</span></div>
                    </div> : null}
                    <div className={this.props.classes.containerContent}>
                        <SimpleModal maxWidth={"md"} title={this.state.showFiles ? "Files" : "Problems"} open={(this.state.showFiles || this.state.showProblems) && this.state.expandedReservationId} onCancel={() => this.state.showFiles ? this.setState({ showFiles: false }) : this.setState({ showProblems: false, currentProblem: null })}>
                            {this.renderModalContentHandler()}
                        </SimpleModal>
                        <RenderItems
                            onExpandHandler={reservationId => this.setState({ expandedReservationId: reservationId }, () => this.getReservationById(this.state.expandedReservationId))}
                            showFilesHandler={() => this.setState({ showFiles: true, currentFile: this.state.currentReservation.file[0] })}
                            showProblemsHandler={() => this.setState({ showProblems: true, currentProblem: this.state.currentReservation.problem[0] })}
                            generateInvoice={reservationId => {
                                this.props.generateInvoice(reservationId).then(() => this.handlerReservations())
                            }}
                            modifyStatus={this.modifyStatusHandler}
                            items={this.state.reservations}
                            renderType={this.state.selectedOption}
                        />
                    </div>
                </div>
            )
        }
        else return null
    }
}

const mapStateToProps = state => ({
    login: state.login
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