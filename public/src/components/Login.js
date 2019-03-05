import React from "react";

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    handleInput = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.name, this.state.password);
    }
    render(){
        return (
            <div className="jumbotron col mt-4 mb-3 mr-3">
            <form onSubmit={this.handleSubmit}>
                <p className="lead">Log in</p>
                {this.props.error ? <div className="alert alert-danger">{this.props.error}</div> : <></>}
                <input name="name" className="form-control mb-3" type="text" placeholder="Enter username" onChange={this.handleInput}></input>
                <input name="password" className="form-control mb-3" type="password" placeholder="Enter password" onChange={this.handleInput}></input>
                <button className="btn btn-primary" type="submit">Log in</button>
            </form>
        </div>
        )
    }
};

export default Login;