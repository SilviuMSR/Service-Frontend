import React from 'react'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import * as CONSTANTS from '../../utils/constants'

const styles = theme => ({
    root: {
        '&:hover': {
            backgroundColor: '#fff',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        },
        border: '#d9d9d9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 280ms ease-in-out',
        maxWidth: 250,
        minWidth: 220,
        margin: 18
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    media: {
        height: 150,
        objectFit: 'contain',
        borderRadius: '50%'
    },
    actionIcon: {
       color: '#1976D2',
       cursor: 'pointer',
       padding: 3
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    titleContainer: {
        flex: 1,
        padding: '8px 0px'
    },
    contentContainer: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column'
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
    titleText: {
        fontSize: 17,
        color: '#545A63',
        fontWeight: 500,
    },
    smallValue: {
        fontWeight: 'bold',
        fontSize: 15
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    smallTitleText: {
        fontSize: 15,
        paddingRight: 4
    },
    cardActions: {
        borderTop: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

const computeStatus = (props, reservationStatus) => {
    if (reservationStatus === CONSTANTS.RESERVATION_PANDING) return (
        <div className={props.classes.statusContainer}>
            <div className={props.classes.ovalPanding} />
            <span className={props.classes.subtitleText}>{CONSTANTS.RESERVATION_PANDING}</span>
        </div>
    )
    if (reservationStatus === CONSTANTS.RESERVATION_ACCEPTED) return (
        <div className={props.classes.statusContainer}>
            <div className={props.classes.ovalGreen} />
            <span className={props.classes.subtitleText}>{CONSTANTS.RESERVATION_ACCEPTED}</span>
        </div>
    )
    if (reservationStatus === CONSTANTS.RESERVATION_DECLINED) return (
        <div className={props.classes.statusContainer}>
            <div className={props.classes.ovalRed} />
            <span className={props.classes.subtitleText}>{CONSTANTS.RESERVATION_DECLINED}</span>
        </div>
    )
    if (reservationStatus === CONSTANTS.RESERVATION_IN_PROGRESS) return (
        <div className={props.classes.statusContainer}>
            <div className={props.classes.ovalProgress} />
            <span className={props.classes.subtitleText}>{CONSTANTS.RESERVATION_IN_PROGRESS}</span>
        </div>
    )
    if (reservationStatus === CONSTANTS.RESERVATION_DONE) return (
        <div className={props.classes.statusContainer}>
            <div className={props.classes.ovalDone} />
            <span className={props.classes.subtitleText}>{CONSTANTS.RESERVATION_DONE}</span>
        </div>
    )

    return <span>-</span>
}

const computeTitle = (props, fieldObj) => {
    if (fieldObj.field === 'reservationStatus') {
        return (<>{computeStatus(props, props.item[fieldObj.field])}</>)
    }

    if (fieldObj.populate) {
        return (
            <div className={props.classes.flexRow}><span className={props.classes.smallTitleText}>{fieldObj.label}:</span> <span className={props.classes.smallValue}>{props.item[fieldObj.populate][fieldObj.field]}</span></div>
        )
    }
    else if (fieldObj.length) {
        return (
            <div className={props.classes.flexRow}><span className={props.classes.smallTitleText}>{fieldObj.label}:</span> <span className={props.classes.smallValue}>{props.item[fieldObj.field].length}</span></div>
        )
    }

    return (
        <div className={props.classes.flexRow}><span className={props.classes.smallTitleText}>{fieldObj.label}:</span> <span className={props.classes.smallValue}>{props.item[fieldObj.field]}</span></div>
    )
}

const computeLogoPath = props => {
    if (props.item.carBrandId && props.item.carBrandId.logoPath) return `http://localhost:9000/brands/${props.item.carBrandId._id}/image`
    return `http://localhost:9000/brands/${props.item._id}/image`
}

const CustomCard = props => {
    const { classes } = props
    const logoPath = computeLogoPath(props)
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {props.displayMainPhoto && <CardMedia
                    className={classes.media}
                    image={logoPath || "https://via.placeholder.com/75x75"}
                />}
                <CardContent onClick={() => props.onClick(props.item)} className={classes.cardContent}>
                    {props.content.map(obj => {
                        return (
                            <>
                                <div className={classes.titleContainer}>
                                    <span className={classes.titleText}>{obj.title}</span>
                                </div>
                                <div className={classes.contentContainer}>
                                    {obj.childrens.map(child => (
                                        <>
                                            {computeTitle(props, child)}
                                        </>
                                    ))}
                                </div>
                            </>
                        )
                    })}
                </CardContent>
            </CardActionArea>
            {props.actions && <CardActions classes={{
                root: props.classes.cardActions
            }}>

                {props.actions.map(action => (
                    <div className={classes.actionIcon} color="primary" onClick={() => action.action(props.item)}>
                        {action.icon}
                    </div>
                ))}
            </CardActions>}
        </Card>
    )
}

export default withStyles(styles)(CustomCard)