import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setAlert } from '../../redux/actions/alert'
// import { SET_ALERT } from '../../redux/actions/types'

function Register(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [conPass, setConPass] = useState("");


    function nameChangeHandle(e) {
        setName(e.target.value);
    }
    function emailChangehandle(e) {
        setEmail(e.target.value);
    }
    function passChangeHandle(e) {
        setPass(e.target.value);
    }
    function conPassChangeHandle(e) {
        setConPass(e.target.value);
    }
    async function registerClickHandle(e) {

        try {
            if (pass == conPass) {
                e.preventDefault();
                let data = await axios.post('http://localhost:80/api/v1/user', { name: name, email: email, password: pass });
            }
            else {
                console.log("password doesnt match")
                props.setAlert("passwords doesnt match", 'danger')
            }
        } catch (error) {
            console.log(error.message)
        }
        // console.log(data.data);

    }
    return (

        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" action="create-profile.html" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="text" value={name} placeholder="Name" name="name" required onChange={nameChangeHandle} />
                    </div>
                    <div className="form-group">
                        <input type="email" value={email} placeholder="Email Address" name="email" onChange={emailChangehandle} />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="8"
                            value={pass}
                            onChange={passChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="8"
                            value={conPass}
                            onChange={conPassChangeHandle}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" onClick={registerClickHandle} />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}
export default connect(null, { setAlert })(Register)