const getLoggedUser = async (req, res, next) => {
    const user = req.user;
    if (user) {
        res.locals.user = {
            ...user,
            full_name: `
			${user.first_name || ''} 
			${user.insertion || ''} 
			${user.last_name || ''}`
			.trim()
        };
		console.log(res.locals.user);
    } else {
        res.locals.user = null;
    }

    next();
};

export { getLoggedUser };
