import React from "react";
import Player from "../components/Player";
import ajax from "../utils/ajax";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";


class Feed extends React.Component {
    state = {
        page: 1,
        videos: [],
        isLoading: true
    }

    componentDidMount(){
        this.fetchData();
    }

    prevPage = () => {
        this.setState({
            page: this.state.page - 1
        }, this.fetchData);
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        }, this.fetchData);
    }

    fetchData = () => {
        ajax.get(`/api/feed?page=${this.state.page}`).then((res) => {
            let videos = res.data.videos.map((video) => {
                video.user = res.data.users.find( (user) => ( user.video===video.id ));
                return video;
            });
            this.setState({
                videos,
                isLoading: false
            });
        });
    }



    render() {
        return (
            <div>
                {this.state.isLoading ? <Spinner></Spinner> :
                 
                 this.state.videos.length ?
                 this.state.videos.map((video)=>(
                    <Player videoId={video.video_id}
                            key={video.id}
                            name={video.user.name}
                            time={video.created_at}>
                    </Player> 
                ))
                 :
                <div className="alert alert-info">Looks like you haven't followed anyone yet. Click on the Users tab!</div>
                 }
                <Pagination prevPage={this.prevPage}
                            nextPage={this.nextPage}
                            page={this.state.page}
                            shouldShowNext={this.state.videos.length === 30}
                            shouldShowPrev={this.state.page > 1}>
                </Pagination>
            </div>
        )
    }
}

export default Feed;