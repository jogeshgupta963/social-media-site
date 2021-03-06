
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <Fragment>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i>Kickstart</Link>
                </h1>
                <ul>
                    <li><Link to="/">Developers</Link> </li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default Navbar;