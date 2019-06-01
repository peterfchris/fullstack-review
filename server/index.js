require('dotenv').config() //This allows us to use .env, which allows us 
							//to have more security for our website and 
							//connect to our database
const express = require('express'), //allows us to use express
	session = require('express-session'), //allows our users to have a session on our site
	massive = require('massive'), //allows us to communicate with our database
	auth_ctrl = require('./controllers/auth_controller') //allows us to connect with our controller file
const app = express() //this essentially turns express on
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env //this lets us use what is in our .env file

app.use(express.json()) //What does express.json mean? What does app.use mean?
app.use(
	session({ //parts that make up our session
		secret: SESSION_SECRET, //makes our website secure
		saveUninitialized: false, //What does this mean?
		resave: false, //What does this mean?
		cookie: {
			maxAge: 1000 * 60 * 60 //This determines the max length of a session, 
								   //the numbers indicate one hour in milliseconds * seconds * minutes
		}
	})
)

massive(CONNECTION_STRING).then((database) => { //turns massive on to the database
	app.set('db', database) //What is the difference between the 'db' and 'database' here?
	console.log('database set!', database.listTables()) //I do not know what .listTables() does
	app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT} ✌️`)) //Connects our app to the server
})

// These are called endpoints. Each one connects to a specific controller in the controllers file and 
// allows the controllers to be utilized by the front end
app.post('/auth/register', auth_ctrl.register)
app.post('/auth/login', auth_ctrl.login)
app.get('/auth/details', auth_ctrl.getDetails)
app.get('/auth/user', auth_ctrl.getUser)
app.get('/auth/logout', auth_ctrl.logout)
