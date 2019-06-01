insert into balances(balance)
values (0);

-- insert into the balances table in 
-- the row called balance the value of 0

insert into users(firstname, lastname, email)
values (${firstname}, ${lastname}, ${email});

-- insert into the users table the first and 
-- last name and email that was entered into 
-- the register form

insert into user_login(username, password)
values(${username}, ${password})
returning username, login_id;

-- insert into the user_login table the 
-- username and password values that were
-- entered into the form and give back the
-- username and login_id of the new user

-- the ${WORD} is the one that is entered in
-- on the front end by the user, and the WORD
-- is the name of the column on the table