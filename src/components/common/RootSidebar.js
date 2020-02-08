import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../common/Sidebar'

class RootSidebar extends Component {


    state = {
        tooltips: [{ key: 'edit', value: "edit" }]
    }

    render() {
        return (<>
            <Sidebar
                displaySidebarHandler={this.props.displaySidebarHandler}
                header={"HEADER"}
                tooltips={this.state.tooltips}
                onSelectTooltipItem={this.onSelectTooltipItemHandler}
                listItems={this.props.items}
                onClickButton={this.props.onLogout}
                buttonText={"logout"} />
        </>)
    }
}

const mapStateToProps = reducers => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RootSidebar)