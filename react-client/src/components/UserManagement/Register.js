import React, { Component } from 'react'
import { createNewUser } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.createNewUser(newUser, this.props.history);
    };
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" 
                                    placeholder="Full Name" name="fullName" value={this.state.fullName}
                                    onChange={this.onChange} />
                                    <p>{errors.fullName}</p>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Email Address (Username)" name="username" 
                                    value={this.state.username} onChange={this.onChange} />
                                    <p>{errors.username}</p>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password}
                                    onChange={this.onChange} />
                                    <p>{errors.password}</p>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="confirmPassword" 
                                    value={this.state.confirmPassword} onChange={this.onChange} />
                                    <p>{errors.confirmPassword}</p>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);


