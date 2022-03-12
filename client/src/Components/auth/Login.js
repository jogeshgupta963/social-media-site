import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");



    function emailChangeHandle(e) {
        setEmail(e.target.value);
    }
    function passChangeHandle(e) {
        setPass(e.target.value);
    }
    async function loginClickHandle(e) {
        e.preventDefault()
        // console.log(email, " ", pass)
        try {

            let data = await axios.post('http://localhost:80/api/v1/auth', { email, password: pass })
            console.log(data.data);

        } catch (error) {
            console.log(error.message)
        }
    }
    return (

        <Fragment>
            <section className="container">
                <div className="alert alert-danger">
                    Invalid credentials
                </div>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" action="dashboard.html" onClick={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            required
                            onChange={emailChangeHandle}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={passChangeHandle}
                            value={pass}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" onClick={loginClickHandle} />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Login