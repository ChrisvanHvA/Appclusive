const getLoggedUser = async (req, res, next) => {    
    res.locals.user = req.user ?? null;
    next();
};

export { getLoggedUser };