import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
	}
	handleLoginInfoUpdate = (e) => {
		this.setState({
			[e.target.name]: e.target.value // This allows the backend to track what's being filled in and where
		})
	}

	handleUserLogin = (e) => {
		e.preventDefault() //Forms submit automatically, this prevents that auto submission until the button's clicked
		const { username, password } = this.state
		axios
			.post('/auth/login', { username, password })
			.then((res) => {
				this.props.history.push('/details')
			})
			.catch((err) => {
				console.log(err)
			})
		e.target.username.value = ''
		e.target.password.value = ''
	}
	render() {
		return (
			<>
				<h1>Login</h1>
				<form onSubmit={this.handleUserLogin}>
					<input
						type='text' //I don't know what this does
						name='username' //I don't know what this does
						placeholder='username' //this puts faded out text in the input field to help with UI experience
						onChange={this.handleLoginInfoUpdate} //this makes it so that when the user types into the input field, the handle above is triggered.
					/>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={this.handleLoginInfoUpdate}
					/>
					<button>Log In</button>
				</form>
			</>
		)
	}
}

export default withRouter(LoginForm) //Why is the withRouter needed? What does it do?
