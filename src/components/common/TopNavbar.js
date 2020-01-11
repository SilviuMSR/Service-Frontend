import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles, Typography, AppBar, Button, IconButton, Toolbar, Tab, Tabs } from '@material-ui/core'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'red'
    },
    clickedOption: {
        color: '#1976d2',
        borderBottom: '2px solid #1976d2'
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    }
})

class TopNavbar extends Component {

    state = {
        selectedOption: ""
    }

    componentDidMount() {
        if (this.props.history.location.pathname !== "/") {
            this.handleClickOption(this.props.history.location.pathname.split('/')[1])
        }
    }

    renderLoginSection = () => {
        if (this.props.login.isLogged) {
            return (
                <Button color="inherit">{this.props.login.username}</Button>
            )
        }

        return (
            <Button color="inherit">Login</Button>
        )

    }

    handleClickOption = option => {
        this.setState({ selectedOption: option }, () => this.props.history.push(`/${option}`))
    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Tabs>
                                <Tab className={`${this.state.selectedOption === "" ? classes.clickedOption : ""}`} label="Homepage" onClick={() => this.handleClickOption("")} />
                                <Tab className={this.state.selectedOption === "reservations" ? classes.clickedOption : ""} label="Reservations" onClick={() => this.handleClickOption("reservations")} />
                            </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(TopNavbar)))