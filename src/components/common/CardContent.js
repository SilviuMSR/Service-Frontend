import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import * as CONSTANTS from '../../utils/constants'

const styles = theme => ({
    root: {
        borderRadius: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0,0,0,0.1)',
        maxWidth: 300,
        minWidth: 300,
        margin: 20,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row'
    }
})

class SimpleCardContent extends Component {

    state = {}

    computeTitle = fieldObj => {
        return (
            <span>{fieldObj.label}: {fieldObj.length ? this.props.item[fieldObj.field].length : this.props.item[fieldObj.field]}</span>
        )
    }

    render() {
        const { classes } = this.props
        return (
            <div onClick={() => this.props.onClick(this.props.item)}>
                <Card className={classes.root}>
                    <CardContent className={classes.cardContent}>
                        {this.props.displayMainPhoto ? <div style={{ flex: 1, padding: 4 }}>
                            <img src="https://via.placeholder.com/75x75" height={75} width={75} />
                        </div> : <div style={{padding: 4 }}>
                                <span>{this.props.position + 1}.</span>
                            </div>}
                        <div style={{ flex: 2,borderRight: '1px solid rgba(0,0,0,0.1)', padding: 4 }}>

                            <Typography style={{ display: 'flex', flexDirection: 'column' }} variant="body2" color="textSecondary" component="div">
                                {this.props.content.map(fieldObj => {
                                    return (
                                        this.props.item && this.props.item[fieldObj.field] ? this.computeTitle(fieldObj) : null
                                    )
                                })}
                            </Typography>

                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 4 }}>
                            <Button onClick={() => this.props.onDelete(this.props.item)} size="small" color="seconday">DELETE</Button>
                            <Button onClick={() => this.props.onEdit(this.props.item)} size="small" color="seconday">EDIT</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = reducers => ({
    language: reducers.language.i18n.sidebar,
    navigationReducer: reducers.navigationReducer,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SimpleCardContent)))