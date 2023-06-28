const setCache = (req, res, next) => {
    res.set('Cache-control', `max-age=0, no-cache, no-store, must-revalidate, private`);

    next();
};

export default { setCache };
