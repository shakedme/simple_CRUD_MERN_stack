import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers, deleteUser, addUser} from '../actions/index';
import {Link} from 'react-router';

class Users extends Component {

    componentWillMount(){
        this.props.fetchUsers();
    }

    renderUsers(){
        if(this.props.users){
            return this.props.users.map((user) =>{
                return (
                    <tr key={user.name}>
                        <td>{user.name}</td>
                        <td>{user.company}</td>
                        <td>{user.phone}</td>
                        <td><Link to={"/edit/" + user._id + '/' + user.name} className="btn btn-primary">Edit</Link><button onClick={ () => {this.props.deleteUser(this.props.users, user.name)}} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })
        }
    }


    render(){
        return(
            <div>
                <h1 className="text-center">Users</h1>
                <div id="table_div">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Company</td>
                            <td>Phone</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
                <Link to="/new" className="btn btn-info addUser"> New User</Link>
                </div>
            </div>
                
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps, {fetchUsers, deleteUser, addUser})(Users);