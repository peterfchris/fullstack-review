const bcrypt = require('bcryptjs') //to use whenever we want to hash a pw

module.exports = {
	//What are these parts (register, login, etc) called?
	register: async (req, res) => { //async is to be used whenever we want to use await.  See line 17-18
		const { firstname, lastname, email, username, password } = req.body //destructuring or pulling off specific 
																			//key value pairs from the body. This 
																			//allows us to say firstname instead of
																			//req.body.firstname, it makes it easier for us
																			//down the road.
		const db = req.app.get('db') //this shorthands the syntax for making a database request.  
									 //Why is it always a GET request?
		const { session } = req //This pulls session off of the request to the server, allowing us to say session instead of req.session
								//What is the session?
		const userFound = await db.check_user_email({ email }) //this function searches the database to see if a login 
															   //exists associated with that email
		//await allows the loading and other functionality to process while that function runs.
		//await should be used for big requests that take a lot of time like database requests and api requests
		if (userFound[0]) return res.status(409).send('Email already exists')
		//Line 14 will return an array.  If the first and only item in the array [0] (0, because computers count from 0)
		//exists, send a 409 status back, designating a conflict, along with a message that the email already exists
		const salt = bcrypt.genSaltSync(10) // generates random characters to add to the password
		const hash = bcrypt.hashSync(password, salt) //mixes the random characters into the password, making it impossible to decrypt
		const createdUser = await db.register_user({ //this function adds the new user information listed below to the database, along
													 //with a hashed password
			firstname,
			lastname,
			email,
			username,
			password: hash
		})
		session.user = { id: createdUser[0].login_id, username: createdUser[0].username }
		//I do not understand this line
		res.status(200).send(session.user)
		//I do not understand what is being sent back
	},
	login: async (req, res) => { //req and res are request and response.  It passes in the two sides of the conversation 
								// between computers, meaning these are needed in order for the database and the backend to talk to each other
		const { username, password } = req.body //pulls username and pw off the body of the request
		const db = req.app.get('db') //short hands the db call
		const { session } = req //pulls session off of the req
		const userFound = await db.check_username({ username }) //checks to see if the user exists by checking the username
		if (!userFound[0]) return res.status(401).send('User does not exist') //this line says that if the user is not found
																			  //send an unauthorized error message back letting the 
																			  //user know their account doesn't exist
		const authenticated = bcrypt.compareSync(password, userFound[0].password) 
		if (authenticated) {
			session.user = { id: userFound[0].login_id, username: userFound[0].username }
			res.status(200).send(session.user)
		} else {
			return res.status(401).send('Incorrect username or password')
		}
		//This constant says to compare the input password with users password on the database. If the user is found
		//create a session for the user according to the username and login id, then send the session back to the user
		//if the user is not found, send back a 401 code saying something they entered in was wrong
	},
	getDetails: async (req, res) => {
		const db = req.app.get('db')
		const { session } = req
		if (session.user) {
			const details = await db.get_user_details({ id: session.user.id })
			const { firstname, email, balance, user_id } = details[0]
			return res.status(200).send({
				firstname,
				email,
				balance,
				user_id,
				username: session.user.username
			})
		}
		return res.status(401).send('Please Log In')
		//This section says that if the session still exists, pull up the users account information and send it to the user
	},
	getUser: (req, res) => {
		const { session } = req
		if (session.user) {
			return res.status(200).send(session.user)
		}
		//this section is saying that if the session still exists, send it to the user
	},
	logout: (req, res) => {
		req.session.destroy()
		res.sendStatus(200)
		//this section says that when the user requests the session to be over, destroy the sessionn and send back a success code of 200
	}
}
