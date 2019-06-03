const initialState = {
	username: '',
	firstname: '',
	balance: null,
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user) {
	return {
		type: UPDATE_USER, //What do type and payload mean?
		payload: user
	}
}

export function clearUser() {
	return {
		type: CLEAR_USER
	}
}

function reducer(state = initialState, action) { //what does action mean, why do reducer's take in two arguments
	switch (action.type) { //what does action.type mean?
		case UPDATE_USER:
			const { username, firstname, balance } = action.payload
			return { username, firstname, balance }
		case CLEAR_USER:
			return { ...initialState }
		default:
			return state
	}
}

export default reducer
