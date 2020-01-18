import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, withStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const style = theme => ({
    dialogTitle: {
        borderBottom: '1px solid #eaedf3',
        padding: '4px 0px 8px 22px'
    },
    dialogActions: {
        borderTop: '1px solid #eaedf3',
        marginTop: 10,
        paddingTop: 25
    },
    acceptButton: {
    },
    cancelButton: {
        marginRight: 'auto',
        marginLeft: 4
    },
    topRightCancelButton: {
        float: 'right',
        margin: '5px 15px 0px 0px',
        cursor: 'pointer',
        fontSize: 18
    }
})

class SimpleModal extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                fullWidth={true}
                maxWidth={this.props.maxWidth || 'sm'}
                onClose={this.props.onClose}
            >
                <DialogTitle className={this.props.styles ? this.props.styles.title : this.props.classes.dialogTitle}>
                    {this.props.title}
                    <Close onClick={this.props.onCancel} className={this.props.classes.topRightCancelButton} />
                </DialogTitle>
                <DialogContent className={this.props.styles ? this.props.styles.contentStyle : null}>
                    {this.props.children}
                </DialogContent>
                <DialogActions className={this.props.classes.dialogActions}>
                    {this.props.cancelButtonText && <Button className={this.props.styles ? this.props.classes.cancelStyle : this.props.classes.cancelButton} onClick={() => this.props.onCancel()} color="secondary">
                        {this.props.cancelButtonText}
                    </Button>}
                    {this.props.acceptButtonText && <Button className={this.props.styles ? this.props.styles.acceptStyle : this.props.classes.acceptButton} onClick={() => this.props.onAccept()} color="primary">
                        {this.props.acceptButtonText}
                    </Button>}
                </DialogActions>
            </Dialog>
        )
    }
}

SimpleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    cancelButtonText: PropTypes.string,
    acceptButtonText: PropTypes.string,
    onAccept: PropTypes.func,
    onClose: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    size: PropTypes.string
}

export default withStyles(style)(SimpleModal)