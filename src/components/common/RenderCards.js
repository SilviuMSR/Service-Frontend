import React from 'react'
import { withStyles } from '@material-ui/core'

import * as CONSTANTS from '../../utils/constants'

import CardContent from './CustomCard'

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
                <div className={`${classes.panelContainer}`}>
                    {this.props.items.map((item, index) => {
                        return <CardContent
                            tooltipMessage={this.props.tooltipMessage}
                            displayOptions={this.props.displayOptions}
                            position={index}
                            displayMainPhoto={this.props.displayMainPhoto}
                            content={this.props.content}
                            type={this.props.type}
                            onDelete={this.props.onDelete}
                            onEdit={this.props.onEdit}
                            actions={this.props.actions}
                            onClick={this.props.onClick}
                            key={index}
                            smallCard={this.props.smallCard}
                            item={item} />
                    })}
                </div>
            </>
        )
    }
}

export default withStyles(styles)(RenderCards)