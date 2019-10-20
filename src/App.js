import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import MuiTheme from './utils/MuiTheme'
import store from '../src/redux/store'
import Root from './components/Root'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import './styles/App.css'
import './styles/Login.css'
import './styles/Sidebar.css'
import './styles/Home.css'

class App extends Component {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider theme={MuiTheme}>
        <ToastContainer autoClose={5000} />
        <section className='appContainer'>
          <Root />
        </section>
      </MuiThemeProvider>
    </Provider>
  }
}

export default App