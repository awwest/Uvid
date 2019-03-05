import React from "react";
import Player from "../components/Player";
import ajax from "../utils/ajax";
import {withRouter} from "react-router-dom";

class Upload extends React.Component {

    state = {video: ""}

    handleChange = (e) => {
        let video = e.target.value.split('v=')[1] && e.target.value.split('v=')[1].split('&')[0];
        this.setState({video, error: null});
        if(!video || video.length !== 11){
            this.playerError();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.error){
            return;
        }
        ajax.post("/posts", {
            video: this.state.video,
        },  {
            withCredentials: true
        }).then((res)=>{
            this.props.history.push("/");
        }).catch(()=>{
            this.setState({error: "Server error, please try again"});
        });
    }

    playerError = () => {
        this.setState({error: "Error, check the URL"});
    }
    render() {
        return (
            <div className="jumbotron">
                <form onSubmit={this.handleSubmit}>
                    {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : <></>}
                    <input className="form-control" type="url" placeholder="Paste YouTube video URL" onChange={this.handleChange}></input>
                    <button className="mt-4 btn btn-primary" type="submit">Post</button>
                </form>
                {this.state.video ? <Player time={new Date()} videoId={this.state.video} onError={this.playerError}></Player> : <br></br>}
            </div>
        )
    }
}

export default withRouter(Upload);