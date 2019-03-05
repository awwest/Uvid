import React from "react";

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleInput = (e) => {
        let {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSignup(this.state.username, this.state.password, this.state.password_confirmation);
    }
    render(){
        return (
            <div className="jumbotron mt-4 mb-3 col">
                <form onSubmit={this.handleSubmit}>
                    <p className="lead">Sign Up</p>
                    {this.props.error ? <div className="alert alert-danger">{this.props.error}</div> : <></>}
                    <input name="username" required className="form-control mb-3" type="text" placeholder="Choose a username" onChange={this.handleInput}></input>
                    <input name="password" required className="form-control mb-3" type="password" placeholder="Enter a password" onChange={this.handleInput}></input>
                    <input name="password_confirmation" required className="form-control mb-3" type="password" placeholder="Confirm your password" onChange={this.handleInput}></input>
                    <button className="btn btn-primary" type="submit">Create</button>
                </form>
            </div>
        )
    }
};

export default Signup;