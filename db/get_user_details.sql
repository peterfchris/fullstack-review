select firstname, email, user_id, balance from users
join balances on balances.balance_id = users.user_id
where user_id = ${id};

-- I do not understand this join statement.
-- How do you know to use join?
-- How do you format them for when you do?
