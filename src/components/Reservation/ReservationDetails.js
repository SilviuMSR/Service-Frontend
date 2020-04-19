import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { Document, Page, pdfjs } from 'react-pdf'
import localConfig from '../../config/local.json'

import { withStyles, Button } from '@material-ui/core'
import { Warning } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check'

import SimpleModal from '../common/SimpleModal'

import * as CONSTANTS from '../../utils/constants'

pdfjs.GlobalWorkerOptions.workerSrc = `${localConfig.frontend}/pdf.worker.js`

const styles = theme => ({
    mainContainer: {
        maxHeight: 400,
        minHeight: 400,
        width: '100%'
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    ovalRed: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'red',
        marginRight: 10,
        marginTop: 3
    },
    ovalGreen: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'green',
        marginRight: 10,
        marginTop: 3
    },
    ovalPanding: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'yellow',
        marginRight: 10,
        marginTop: 3
    },
    ovalProgress: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'purple',
        marginRight: 10,
        marginTop: 3
    },
    ovalDone: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4d7549',
        marginRight: 10,
        marginTop: 3
    },
    navbar: {
        maxHeight: 50,
        minHeight: 25,
        width: '100%',
        borderBottom: '1px solid #eaedf3',
        display: 'flex',
        flexDirection: 'row'
    },
    navbarItem: {
        cursor: 'pointer',
        flex: 1,
        borderRight: '1px solid #eaedf3',
        textAlign: 'center',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: 9,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)'
        }
    },
    clickedItem: {
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    content: {
        width: '100%',
        padding: 22

    },
    contentStyle: {
        padding: 0,
        overflow: 'hidden'
    },
    title: {
        padding: '4px 0px 8px 22px',
        marginBottom: 0,
        borderBottom: '1px solid #eaedf3'
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    generalDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    statusDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alingItems: 'flex-end'
    },
    item: {
        padding: 8
    },
    itemTitle: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: 500
    },
    filesContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    filesList: {
        flex: 1,
        borderRight: '1px solid rgba(0,0,0,0.2)'
    },
    filePdf: {
        flex: 4
    },
    problemsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    problemsList: {
        flex: 1,
        borderRight: '1px solid rgba(0,0,0,0.2)',
        padding: 8
    },
    problemStep: {
        flex: 3,
        padding: 8
    },
    problemDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: 8
    },
    selectedProblem: {
        // borderBottom: '1px solid rgba(0,0,0,0.2)'
    }
})

class ReservationDetails extends Component {

    state = {
        showFiles: false,
        showProblems: false,
        tabs: [],
        selectedTab: this.props.tabs[0],
        currentFile: null,
        pdfPage: null,
        currentProblem: null
    }

    componentDidMount() {
        let mappedTabs = this.props.tabs.map((tab, index) => ({ clicked: index === 0 ? true : false, value: tab }))
        this.setState({
            tabs: mappedTabs
        })
    }

    onTabChange = tab => {
        const tabIndex = this.state.tabs.findIndex(index => index.value === tab)

        if (tabIndex > -1) {
            let tabsCopy = this.state.tabs.map(tab => ({ ...tab }))
            tabsCopy = tabsCopy.map(tab => ({ value: tab.value, clicked: false }))
            tabsCopy[tabIndex].clicked = true

            this.setState({ tabs: tabsCopy, selectedTab: tabsCopy[tabIndex].value })
        }
    }

    computeStatus = reservationStatus => {
        if (reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalPanding} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_PANDING}</span>
            </div>
        )
        if (reservationStatus === CONSTANTS.RESERVATION_ACCEPTED) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalGreen} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_ACCEPTED}</span>
            </div>
        )
        if (reservationStatus === CONSTANTS.RESERVATION_DECLINED) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalRed} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_DECLINED}</span>
            </div>
        )
        if (reservationStatus === CONSTANTS.RESERVATION_IN_PROGRESS) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalProgress} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_IN_PROGRESS}</span>
            </div>
        )
        if (reservationStatus === CONSTANTS.RESERVATION_DONE) return (
            <div className={this.props.classes.statusContainer}>
                <div className={this.props.classes.ovalDone} />
                <span className={this.props.classes.subtitleText}>{CONSTANTS.RESERVATION_DONE}</span>
            </div>
        )

        return <span>-</span>
    }

    renderStatusDetails = () => {
        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.item}>{this.props.language.utils.reservationWait}</span>
                <div className={this.props.classes.optionsContainer}>
                    <Button onClick={() => this.props.modifyStatus(this.props.item._id, CONSTANTS.RESERVATION_ACCEPTED)} className={this.props.classes.acceptIcon}>ACCEPT</Button>
                    <Button onClick={() => this.props.modifyStatus(this.props.item._id, CONSTANTS.RESERVATION_DECLINED)} className={this.props.classes.declineIcon}>DECLINE</Button>
                </div>
            </div>
        )

        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_DONE) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.item}>{this.props.language.utils.reservationDone}</span>
                {/* <div className={this.props.classes.optionsContainer}>
                    {!this.props.item.file.length ? <Button onClick={() => this.props.generateInvoice(this.props.item._id)}>GENERATE DOCUMENTS</Button> :
                        <>
                            <Button onClick={this.props.showFilesHandler}>SEE FILES</Button>
                        </>}
                </div> */}
            </div>
        )

        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_IN_PROGRESS) return (
            <>
                <div className={this.props.classes.options}>
                    <span className={this.props.classes.item}>{this.props.item.userId.username.charAt(0).toUpperCase() + this.props.item.userId.username.slice(1)} works at this car.</span>
                </div>
                {this.props.login.position.toLowerCase() === 'employee' && <div className={this.props.classes.optionsContainer}>
                    <CheckIcon onClick={() => this.props.modifyStatus(this.props.item._id, CONSTANTS.RESERVATION_DONE, this.props.login.userId)} />
                </div>}
            </>
        )

        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_DECLINED) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.item}>{this.props.language.utils.reservationDecline}</span>
            </div>
        )

        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_ACCEPTED) return (
            <div className={this.props.classes.options}>
                <span className={this.props.classes.item}>{this.props.language.utils.reservationWaitForEmployee}</span>
                <div className={this.props.classes.optionsContainer}>
                    <Button onClick={() => this.props.modifyStatus(this.props.item._id, CONSTANTS.RESERVATION_IN_PROGRESS, this.props.login.userId)}>Take this reservation</Button>
                </div>
            </div>
        )

        return null
    }


    renderDetails = () => {

        const detailFields = [
            { populate: 'carBrandId', label: this.props.language.labels.brand, field: 'name' },
            { populate: 'carModelId', label: this.props.language.labels.model, field: 'name' },
            { field: 'clienName', label: this.props.language.labels.clientName },
            { field: 'clientEmail', label: this.props.language.labels.clientEmail },
            { field: 'createdAt', label: this.props.language.labels.date },
            { field: 'price', label: this.props.language.labels.price }
        ]

        const statusFields = [
            { label: this.props.language.labels.status, field: 'reservationStatus' },
            { populate: 'userId', label: this.props.language.labels.reservedBy, field: 'username' }
        ]

        return (
            <div className={this.props.classes.detailsContainer}>
                <div className={this.props.classes.generalDetails}>
                    {detailFields.map(obj => {
                        if (obj.field === 'createdAt') {
                            return (
                                <span className={`${this.props.classes.item}`}><span className={this.props.classes.itemTitle}>{obj.label}: </span><span className={this.props.classes.itemText}>{moment(this.props.item[obj.field]).format(CONSTANTS.INPUT_TYPE_DATE_FORMAT)}</span></span>
                            )
                        }
                        if (obj.populate) {
                            return (
                                <span className={this.props.classes.item}><span className={this.props.classes.itemTitle}>{obj.label}: </span><span className={this.props.classes.itemText}>{this.props.item[obj.populate][obj.field]}</span></span>
                            )
                        }
                        return (
                            <span className={this.props.classes.item}><span className={this.props.classes.itemTitle}>{obj.label}: </span><span className={this.props.classes.itemText}>{this.props.item[obj.field]}</span></span>
                        )
                    })}
                </div>
                <div className={this.props.classes.statusDetails}>
                    {statusFields.map(obj => {
                        if (obj.field === 'reservationStatus') {
                            return (
                                <span className={`${this.props.classes.item} ${this.props.classes.statusContainer}`}><span className={this.props.classes.itemText}>{this.computeStatus(this.props.item[obj.field])}</span></span>
                            )
                        }
                        if (obj.populate && this.props.item[obj.populate]) {
                            return (
                                <span className={this.props.classes.item}><span className={this.props.classes.itemTitle}>{obj.label}: </span><span className={this.props.classes.itemText}>{this.props.item[obj.populate] ? this.props.item[obj.populate][obj.field] : '-'}</span></span>
                            )
                        }
                        else if (this.props.item[obj.field]) {
                            return (
                                <span className={this.props.classes.item}><span className={this.props.classes.itemTitle}>{obj.label}: </span><span className={this.props.classes.itemText}>{this.props.item[obj.field]}</span></span>
                            )
                        }
                    })}
                    {this.renderStatusDetails()}
                </div>
            </div>
        )
    }


    onFileClickHandler = file => {
        this.setState({ currentFile: file })
    }

    onFileLoadSuccess = () => {
        this.setState({ pdfPage: 1 })
    }

    renderInvoices = () => {
        if (this.props.item.reservationStatus === CONSTANTS.RESERVATION_DONE) return (
            <div className={this.props.classes.options}>
                <div className={this.props.classes.optionsContainer}>
                    {!this.props.item.file.length ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Warning style={{ paddingRight: 8, fontSize: 28 }} />
                            <h2 style={{ letterSpacing: 4, margin: '-4px 0px 4px 0px', marginTop: '-4px' }}>{this.props.language.utils.warning}</h2>
                        </div>
                        <span>{this.props.language.utils.noDocument}</span>
                        <Button color="secondary" onClick={() => this.props.generateInvoice(this.props.item._id)}>{this.props.language.buttons.invoice}</Button>
                    </div> :
                        <>
                            <div className={this.props.classes.filesContainer}>
                                <div className={this.props.classes.filesList}>
                                    {this.props.item.file.length ? this.props.item.file.map(file => {
                                        return (
                                            <div onClick={() => this.onFileClickHandler(file)} className={`${this.state.currentFile ? this.state.currentFile._id === file._id ? this.props.classes.selectedProblem : "" : ""} ${this.props.classes.fileWrapper}`}>
                                                <span>{file.customName}</span>
                                            </div>
                                        )
                                    }) : null}
                                </div>
                                <div className={this.props.classes.filePdf}>
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
                        </>}
                </div>
            </div>
        )

        return (
            <span>{this.props.language.utils.generateInvoiceFail}</span>
        )
    }

    onProblemClickHandler = problem => {
        this.setState({ currentProblem: problem })
    }

    renderProblems = () => {
        if (this.props.item.problem.length) {
            return (
                <>
                    <div className={this.props.classes.problemsContainer}>
                        <div className={this.props.classes.problemsList}>
                            {this.props.item.problem.map(pr => {
                                return (
                                    <div onClick={() => this.onProblemClickHandler(pr)} className={`${this.state.currentProblem ? this.state.currentProblem._id === pr._id ? this.props.classes.selectedProblem : "" : ""} ${this.props.classes.problemWrapper}`}>
                                        <div className={this.props.classes.problemDetails}>
                                            <span>{pr.name}</span>
                                            <span>{pr.price} {this.props.language.utils.ron}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={this.props.classes.problemStep}>
                            {this.state.currentProblem ? this.state.currentProblem.steps.map((step, index) => {
                                return (
                                    <div className={this.props.classes.stepsContainer}>
                                        <span>{index + 1}.&nbsp;{step}</span>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                </>
            )
        }
        else return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Warning style={{ paddingRight: 8, fontSize: 28 }} />
                    <h2 style={{ letterSpacing: 4, margin: 0, marginTop: '-4px' }}>{this.props.language.utils.warning}</h2>
                </div>
                <span>{this.props.language.utils.noProblem}</span>
            </div>)
    }

    renderContent = () => {
        switch (this.state.selectedTab) {
            case CONSTANTS.DETAILS_TAB:
                return (
                    this.renderDetails()
                )
            case CONSTANTS.PROBLEMS_TAB:
                return (
                    this.renderProblems()
                )
            case CONSTANTS.INVOICES_TAB:
                return (
                    this.renderInvoices()
                )
        }
    }

    mainRender = () => {
        return (
            <div className={this.props.classes.mainContainer}>
                <div className={this.props.classes.navbar}>
                    {this.state.tabs.map(tab => {
                        return (
                            <div onClick={() => this.onTabChange(tab.value)} className={`${this.props.classes.navbarItem} ${tab.clicked ? this.props.classes.clickedItem : ''}`}>
                                <span>{tab.value}</span>
                            </div>
                        )
                    })}
                </div>
                <div className={this.props.classes.content}>
                    {this.renderContent()}
                </div>

            </div>
        )
    }

    render() {
        if (this.props.item) {
            return (
                <SimpleModal
                    cancelButtonText={this.props.language.buttons.cancel}
                    styles={this.props.classes}
                    maxWidth={"md"}
                    title={this.props.language.titles.reservationDetails}
                    open={this.props.open}
                    onCancel={() => this.props.onCancel()}>
                    {this.mainRender()}
                </SimpleModal>)
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReservationDetails))