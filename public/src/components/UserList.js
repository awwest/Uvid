import React from "react";
import {Link} from "react-router-dom";

function UserList(props){
    return (
        <>
            {props.users.map((user)=>(
            <Link className="card text-white bg-primary mb-3 mt-3" key={user.id} to={{ 
                pathname: "/profile/" + user.id,
                state: {
                    isLoggedIn: props.isLoggedIn,
                    id: user.id
                }
            }}>
                <h2 className="card-header card-title">
                    {user.name}
                </h2>
                <div className="card-body">
                    <span className="badge badge-pill badge-primary mr-4 mb-2">{user.posts.length} videos shared</span>
                    <span className="badge badge-pill badge-secondary">{`${user.followers.length} followers`}</span>
                    <span className="ml-3 badge badge-pill badge-secondary">{`Following ${user.following.length}`}</span>
                </div>
            </Link>))}
        </>
    );
}

export default UserList;