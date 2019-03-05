import React from "react";
import ajax from "../utils/ajax.js";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

class Users extends React.Component {
    
    state = {
        users: [],
        page: 1,
        isLoading: true
    }

    componentDidMount(){
      this.fetchData();
    }

    fetchData = () => {
        ajax.get('/users', {page: this.state.page}).then((res)=>{
            this.setState({users: res.data.users, isLoading: false});
         });
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        });
        this.fetchData();
    }

    prevPage = () => {
        this.setState({
            page: this.state.page - 1
        });
        this.fetchData();
    }

    render() {
        return <div>
            {this.state.isLoading ? <Spinner></Spinner> 
            :
            <UserList users={this.state.users}></UserList>}

            <Pagination page={this.state.page}
                        nextPage={this.nextPage} 
                        prevPage={this.prevPage}
                        shouldShowNext={this.state.users.length === 30}
                        shouldShowPrev={this.state.page > 1}>
            </Pagination>
        </div>;
    }
}

export default Users;