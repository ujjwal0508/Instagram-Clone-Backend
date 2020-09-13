const authCheck = (req, res, next) => {

    // console.log(req);   

    if (req.originalUrl === '/') {
        return next();
    }

    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = authCheck;