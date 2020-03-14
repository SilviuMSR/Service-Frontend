import React from 'react'
import { withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../utils/constants'

import CardContent from './CardContent'

const styles = theme => ({
    panelContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})


class RenderCards extends React.Component {

    render() {
        let { classes } = this.props

        return (
            <>
                <div className={classes.panelContainer}>
                    {this.props.items.map((item, index) => {
                        return <CardContent position={index} displayMainPhoto={this.props.displayMainPhoto} content={this.props.content} type={this.props.type} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onClick={this.props.onClick} key={index} item={item} />
                    })}
                </div>
            </>
        )
    }
}

export default withStyles(styles)(RenderCards)