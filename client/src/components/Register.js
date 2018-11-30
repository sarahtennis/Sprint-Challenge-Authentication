import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const url = 'http://localhost:3300';

const initialUser = {
    username: '',
    password: ''
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: { ...initialUser },
            message: '',
            redirect: false
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;

        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.user.username && this.state.user.password){
        axios.post(`${url}/api/register`, this.state.user)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Registration successful',
                        user: { ...initialUser },
                        redirect: true
                    });
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failure'
                });
            });
        } else {
            alert('No empty fields');
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        placeholder="Username"
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        placeholder="Password"
                        onChange={this.inputHandler}
                    />
                    <button type="submit" disabled={this.state.preventSubmit}>Submit</button>
                    {this.state.message ? <h4>{this.state.message}</h4> : null}
                </form>
                {this.state.redirect ? <Redirect to='/login' /> : null}
            </div>
        )
    }
}

export default Register;