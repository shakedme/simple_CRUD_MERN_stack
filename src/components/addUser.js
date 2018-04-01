import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {addUser} from '../actions/index.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class AddUser extends Component {

    onSubmit(props){
        const http = this.props.route.path == '/new' ? 'post' : 'put';
        const id = this.props.params.id;
        props._id = id;
        this.props.addUser(props, http);
        window.location = '/';           
    }


    render(){
        const title = this.props.route.path == '/new' ? 'Create New User' : 'Edit User - ' + this.props.params.name ;
        const { fields: {name, company, phone}, handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>{title}</h3>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field className="form-control" name="name" component="input" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <Field className="form-control" name="company" component="input" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field className="form-control" name="phone" component="input" type="text" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger pull-lg-right">Back</Link>
            </form>

        )
    }
}


AddUser = connect(
    null,
    {addUser}   
)(AddUser);

export default reduxForm({
    form: 'AddUser',
    fields: ['name', 'company', 'phone']
})(AddUser);
