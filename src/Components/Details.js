import React, { Component } from 'react'
import axios from 'axios'
import { updateUser, clearUser } from '../redux/userReducer'
import { connect } from 'react-redux'

class Details extends Component {
	componentDidMount() {
		axios
			.get('/auth/details')
			.then((res) => {
				this.props.updateUser(res.data)
			})
			.catch((err) => {
				this.props.history.push('/login')
			})
	}

	handleUserLogout = () => { //how do I know when to pass in an argument in these, and when not to?
		axios.get('/auth/logout').then((res) => {
			this.props.clearUser()
			this.props.history.push('/')
		})
	}

	render() {
		return (
			<div>
				<h1>Details</h1>
				{this.props.firstname && (
					<>
						<h3>{this.props.firstname}</h3>
						<h4>${this.props.balance}</h4>
						<button onClick={this.handleUserLogout}>Logout</button>
					</>
				)}
			</div>
		)
	}
}

function mapStateToProps(reduxState) {
	return {
		firstname: reduxState.firstname,
		balance: reduxState.balance
	}
}

const mapDispatchToProps = { //What is this doing? What is dispatch?
	updateUser,
	clearUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Details)
