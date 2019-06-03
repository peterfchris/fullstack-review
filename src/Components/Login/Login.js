import React, { Component } from 'react'
import axios from 'axios'
import { updateUser } from '../../redux/userReducer' // What is this?
import { connect } from 'react-redux' //What does this do? I understand how to write it, but I don't understand it in general
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

class Login extends Component {
	componentDidMount() { //I understand this, but how do I know when to use it?
		axios.get('/auth/user').then((res) => {
			this.props.updateUser(res.data)
			this.props.history.push('/details')
		})
		this.props.id && this.props.history.push('/details')
	}

	render() {
		return (
			<div>
				<LoginForm />
				<RegisterForm />
			</div>
		)
	}
}

function mapStateToProps(reduxState) {
	return reduxState
}

export default connect(
	mapStateToProps,
	{ updateUser }
)(Login)

//This whole component is super over my head
