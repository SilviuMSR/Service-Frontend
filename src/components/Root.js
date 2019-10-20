import React, { Component } from 'react'
import { connect } from 'react-redux'

class Root extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
       return (
           <div>
               App
           </div>
       )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)