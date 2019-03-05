import React from "react";
import YouTube from 'react-youtube';

function Player(props){
    return (
        <div className="mt-5 card border-primary mr-5 ml-5">
            <div className="card-header">{props.name} posted at {new Date(props.time).toLocaleString()}</div>
            <div className="card-body bg-primary">
                <YouTube
                videoId={props.videoId}
                id={props.videoId}
                onError={props.onError}
                className="player"/>
            </div>
        </div>

    );
}

export default Player;