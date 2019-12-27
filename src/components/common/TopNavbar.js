import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography, AppBar, Button, IconButton, Toolbar } from '@material-ui/core'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
})

class TopNavbar extends Component {

    renderLoginSection = () => {
        console.log(this.props.login)
        if (this.props.login.isLogged) {
            return (
                <Button color="inherit">{this.props.login.username}</Button>
            )
        }

        return (
            <Button color="inherit">Login</Button>
        )

    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        {this.renderLoginSection()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopNavbar))