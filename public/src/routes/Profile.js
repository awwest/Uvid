import React from "react";
import Player from "../components/Player";
import ajax from "../utils/ajax";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";


class Profile extends React.Component {
    state = {
        isLoading: true,
        page: 1,
        id: (this.props.match && this.props.match.params.id) || this.props.location.state.id,
        following: [],
        followers: [],
        name: '',
        isCurrentUser: true,
        posts: [],
        isLoggedIn: this.props.location.state.isLoggedIn
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        ajax.get(`/users/${this.state.id}`, {
            page: this.state.page,
        }).then((res) => {
            let user = res.data;
            this.setState({
                isLoading: false,
                ...user
            });
        });
    }

    nextPage = () => {
        this.setState({page: this.state.page + 1, isLoading: true});
        this.fetchData();
    }

    prevPage = () => {
        this.setState({page: this.state.page - 1, isLoading: true});
        this.fetchData();
    }

    follow = () => {
        ajax.post('/relationships', {followed_id: this.state.id}).then(()=>{
            this.setState({ isFollowedByCurrentUser: true });
        });
    }
    unfollow= () => {
        ajax.delete('/relationships/' + this.state.id).then(()=>{
            this.setState({ isFollowedByCurrentUser:false });
        })
    }

    deleteVideo = (videoId) => {
        //In production I would use a styled react modal for this confirmation
        let confirm = window.confirm("Are you sure you want to delete this video?");
        if(confirm){
            ajax.delete(`/posts/${videoId}`).then(()=>{
                this.setState({posts:this.state.posts.filter((post)=>post.id!==videoId)});  
            });
        }
        
    }

    render() {
        return (
            <div>
                {!this.state.isCurrentUser && this.state.isLoggedIn && (this.state.isFollowedByCurrentUser ? 
                    <button className="btn btn-outline-secondary mt-5" type="button" onClick={this.unfollow}>UNFOLLOW</button> :
                    <button className="btn btn-outline-primary mt-5" type="button" onClick={this.follow}>FOLLOW</button>
                )}
                 
                {this.state.isLoading ? <Spinner></Spinner> 
                  : 
                  this.state.posts.map((video)=>(
                    <div key={video.id}>
                    <Player videoId={video.video_id}
                            time={video.created_at}
                            name={this.state.name}
                            key={video.id}>
                    </Player>
                    { this.state.isCurrentUser &&
                        <button className="btn btn-danger" onClick={()=>this.deleteVideo(video.id)}>X</button>
                    }
                    </div>
                ))}
                <Pagination page={this.state.page}
                           nextPage={this.nextPage} 
                           prevPage={this.prevPage}
                           shouldShowNext={this.state.posts.length === 30}
                           shouldShowPrev={this.state.page > 1}>
                </Pagination>
           </div>
        )
    }
}

export default Profile;