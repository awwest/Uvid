import React from "react";
import {Link} from "react-router-dom";

function Nav(props){
    return <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <ul className="navbar-nav mr-auto">
            { props.isLoggedIn &&
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/">Feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={{ 
                    pathname: "/users",
                    state: {
                        isLoggedIn: props.isLoggedIn
                    }
                }}>Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/upload">New Post</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to={{ 
                    pathname: "/profile/" + props.userId,
                    state: {
                        isLoggedIn: props.isLoggedIn,
                        id: props.userId
                    }
                }}>Profile</Link>
            </li> 
            </>}
        </ul>
        
        {
            props.isLoggedIn ? <button className="btn btn-outline-secondary" onClick={props.logout} type="button">Logout</button>
            :
            <Link className="btn btn-secondary" to="/">Login</Link>
        }
        
        
        </nav>
    </header>
}
export default Nav;