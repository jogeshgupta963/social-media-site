import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./Components/layout/Navbar.js"
import Landing from "./Components/layout/Landing.js"
import Login from "./Components/auth/Login.js"
import Register from "./Components/auth/Register.js"
import Alert from './Components/layout/Alert'
//css
import './App.css';
//Redux
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </section>

        </Fragment>
      </Router >
    </Provider>
  );
}

export default App;
