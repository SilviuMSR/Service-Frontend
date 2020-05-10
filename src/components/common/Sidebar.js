import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, ListItemIcon, Collapse, withStyles, Button } from '@material-ui/core'
import { FolderOutlined as FolderOutlinedIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon, Menu, ExitToApp } from '@material-ui/icons'

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 2
    },
    truckIcon: {
        fontSize: 21,
        paddingLeft: 4,
        paddingTop: 2,
        color: 'white'
    },
    sidebarHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebarHeaderContent: {
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f2f2f2'
    },
    listItemText: {
        color: '#fff',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal'
    },
    listItemTextSelected: {
        color: '#c0d3d3',
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal'
    },
    sidebarIcon: {
        color: '#fff'
    },
    logoutButton: {
        color: 'white',
        backgroundColor: theme.palette.mainColor,
        marginTop: '-8px'
    },
    displayNone: {
        display: 'none'
    },
    languageSelector: {
        marginLeft: 'auto'
    },
    listWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8
    },
    listElements: {
        width: '100%',
        fontFamily: 'Roboto',
    },
    logo: {
        marginLeft: 38,
        height: '40px',
        width: '100px'
    },
    exitIcon: {
        fontSize: 24,
        color: 'white',
        cursor: 'pointer'
    }
})

class Sidebar extends Component {
    state = {
        selected: {},
        expanded: {},
        displayNone: false
    }

    componentDidMount() {
        this.handlePathExpansion()
    }

    handlePathExpansion = () => {
        const currentPathname = this.props.location.pathname

        if (currentPathname.length === 1) {
            this.handleSelect('dashboard')
        }
        else {
            const labels = currentPathname.split('/')
            const currentLabel = labels.pop()
            this.handleSelect(currentLabel)
            labels.forEach(label => {
                this.handleExpand(label)
            })
        }
    }

    handleSelect = value => {
        let selectedCopy = { ...this.state.selected }
        Object.keys(selectedCopy).forEach(element => {
            selectedCopy[element] = false
        })
        selectedCopy[value] = !selectedCopy[value]
        this.setState({ selected: selectedCopy })
    }


    handleExpand = value => {
        let expandCopy = { ...this.state.expanded }
        expandCopy[value] = !expandCopy[value]
        this.setState({ expanded: expandCopy })
    }

    render() {
        const { classes } = this.props
        const ListItemComponent = props => {
            if (props.isSelected) return (<ListItem component={props.to ? Link : 'div'} to={props.to} divider={true} button selected={this.state.selected[props.label]} onClick={() => this.handleSelect(props.label)}>
                <ListItemIcon style={{ color: '#c0d3d3' }}>
                    {props.icon ? props.icon : <FolderOutlinedIcon />}
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listItemTextSelected }} inset primary={props.text} />
                {props.nested ? props.open ? <ExpandLessIcon className={classes.sidebarIcon} onClick={() => this.handleExpand(props.label)} /> : <ExpandMoreIcon className={classes.sidebarIcon} onClick={() => this.handleExpand(props.label)} /> : null}
            </ListItem>)
            return (<ListItem component={props.to ? Link : 'div'} to={props.to} divider={true} button selected={this.state.selected[props.label]} onClick={() => this.handleSelect(props.label)}>
                <ListItemIcon style={{ color: '#fff' }}>
                    {props.icon ? props.icon : <FolderOutlinedIcon />}
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listItemText }} inset primary={props.text} />
                {props.nested ? props.open ? <ExpandLessIcon className={classes.sidebarIcon} onClick={() => this.handleExpand(props.label)} /> : <ExpandMoreIcon className={classes.sidebarIcon} onClick={() => this.handleExpand(props.label)} /> : null}
            </ListItem>)
        }

        return (
            <>
                <div className={`${this.state.displayNone ? classes.displayNone : ""} sidebar`}>
                    <div className={classes.sidebarHeaderContent}>
                        <img width={'100%'} src={`/assets/logoservice.png`} />
                    </div>
                    <List component='nav' className={classes.listWrapper}>
                        <>
                            <div className={classes.listElements}>
                                {this.props.listItems.map(item => {
                                    if (!item.nested) {
                                        return (<div key={item.label}><ListItemComponent
                                            isSelected={this.state.selected[item.label]}
                                            {...item}
                                            text={this.props.language[item.label]}
                                            open={this.state.expanded[item.expandedText]} /></div>)
                                    }
                                    if (item.nested) {
                                        return (<div key={item.label}>
                                            <ListItemComponent {...item} isSelected={this.state.selected[item.label]} text={this.props.language[item.label][item.label]} nested open={this.state.expanded[item.expandedText]} />
                                            <Collapse
                                                in={this.state.expanded[item.expandedText]}
                                                timeout='auto'
                                                unmountOnExit>
                                                <List
                                                    className={classes.nested}
                                                    component='div'
                                                    disablePadding>
                                                    {item.nestedComponents.map(component => <ListItemComponent key={component.label} isSelected={this.state.selected[component.label]} {...component} text={this.props.language[item.label][component.label]} />)}
                                                </List>
                                            </Collapse>
                                        </div>)
                                    }
                                    return null
                                })}
                            </div>
                        </>
                    </List>
                    <div onClick={this.props.onClickButton} style={{ display: 'flex', flexDirection: 'row', marginTop: 'auto', paddingLeft: 16, paddingBottom: 16 }}>
                        <ExitToApp className={classes.exitIcon} />
                        <Button className={classes.logoutButton}>{this.props.buttonText}</Button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = reducers => ({
    language: reducers.language.i18n.sidebar,
    navigationReducer: reducers.navigationReducer,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Sidebar)))