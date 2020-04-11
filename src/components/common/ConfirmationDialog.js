import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogActions, Button, DialogContentText, DialogTitle, withStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const styles = theme => ({
    dialogTitle: {
        borderBottom: '1px solid #eaedf3',
        marginBottom: 15
    },
    topCancelButton: {
        float: 'right', 
        margin: '5px 0px 0px 0px', 
        cursor: 'pointer'
    },
    dialogContent: {
        padding: '2px 20px'
    },
    dialogActions: {
        borderTop: '1px solid #eaedf3', 
        marginTop: 10, 
        paddingTop: 25
    },
    cancelButton: {
        marginRight: 'auto', 
        marginLeft: 18 
    }
})

class ConfirmationDialog extends Component {

    render() {
        return (
            <Dialog
                open={this.props.open}
                fullWidth={true}
                onClose={() => this.props.onClose()}
                maxWidth={'xs'}
            >
                <DialogTitle className={this.props.classes.dialogTitle}>
                    Stergere
                    <Close onClick={this.props.onCancel} className={this.props.classes.topCancelButton}/>
                </DialogTitle>
                <DialogContent className={this.props.classes.dialogContent}>
                    <DialogContentText>
                        {this.props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={this.props.classes.dialogActions}>
                    <Button className={this.props.classes.cancelButton} onClick={() => this.props.onCancel()} color="secondary">
                        {this.props.cancelButtonText}
                    </Button>
                    <Button onClick={() => this.props.onAccept()} color="primary">
                        {this.props.acceptButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    acceptButtonText: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default withStyles(styles)(ConfirmationDialog)