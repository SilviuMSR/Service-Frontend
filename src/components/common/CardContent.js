import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { ClickWrapper } from '../../utils/helpers'

import * as CONSTANTS from '../../utils/constants'

const styles = theme => ({
    root: {
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        maxWidth: 300,
        minWidth: 300,
        margin: '12px 36px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row'
    },
    displayNoneTooltip: {
        display: 'none'
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
        backgroundColor: '#ff5722',
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
    extraWidth: {
        maxWidth: 330,
        minWidth: 330
    }
})

class SimpleCardContent extends Component {

    state = {}

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

    computeTitle = fieldObj => {
        if (fieldObj.field === 'reservationStatus') {
            return (<>{this.computeStatus(this.props.item[fieldObj.field])}</>)
        }

        if (fieldObj.populate) {
            return (
                <span>{fieldObj.label}: {this.props.item[fieldObj.populate][fieldObj.field]}</span>
            )
        }
        else if (fieldObj.length) {
            return (
                <span>{fieldObj.label}: {this.props.item[fieldObj.field].length}</span>
            )
        }

        return (
            <span>{fieldObj.label}: {this.props.item[fieldObj.field]}</span>
        )
    }

    computeLogoPath = () => {
        if (this.props.item.carBrandId && this.props.item.carBrandId.logoPath) return `http://localhost:9000/brands/${this.props.item.carBrandId._id}/image`
        return `http://localhost:9000/brands/${this.props.item._id}/image`
    }

    render() {
        const logoPath = this.computeLogoPath()
        const { classes } = this.props
        return (
            <ClickWrapper onClick={() => this.props.onClick(this.props.item)}>
                <Tooltip classes={{
                    tooltip: !this.props.tooltipMessage ? classes.displayNoneTooltip : ''
                }} placement="top-start" title={this.props.tooltipMessage}>
                    <Card style={{ margin: this.props.extraWidth ? '12px 10px' : '12px 36px' }} className={`${classes.root} ${this.props.extraWidth ? classes.extraWidth : ''}`}>
                        <CardContent className={`${this.props.extraWidth ? classes.extraWidth : ''} ${classes.cardContent}`}>
                            {this.props.displayMainPhoto ? <div style={{ flex: 1, padding: 4 }}>
                                <img src={logoPath || "https://via.placeholder.com/75x75"} height={75} width={100} />
                            </div> : null}
                            <div style={{ flex: 2, borderRight: this.props.displayOptions ? '1px solid rgba(0,0,0,0.1)' : '', padding: 4 }}>

                                <Typography style={{ display: 'flex', flexDirection: 'column' }} variant="body2" color="textSecondary" component="div">
                                    {this.props.content.map(fieldObj => {
                                        return (
                                            this.props.item && this.props.item[fieldObj.populate ? fieldObj.populate : fieldObj.field] ? this.computeTitle(fieldObj) : <span>{fieldObj.label}: -</span>
                                        )
                                    })}
                                </Typography>

                            </div>
                            {this.props.displayOptions && <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 4 }}>
                                <Button onClick={() => this.props.onDelete(this.props.item)} size="small" color="seconday">{this.props.language.buttons.delete}</Button>
                                {this.props.type === CONSTANTS.RESERVATION_TYPE ? <Button onClick={() => this.props.onClick(this.props.item)} size="small" color="seconday">DETAILS</Button> : <Button onClick={() => this.props.onEdit(this.props.item)} size="small" color="seconday">EDIT</Button>}
                            </div>}
                        </CardContent>
                    </Card>
                </Tooltip>
            </ClickWrapper >
        )
    }
}

const mapStateToProps = reducers => ({
    language: reducers.language.i18n,
    navigationReducer: reducers.navigationReducer,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimpleCardContent)))