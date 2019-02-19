/**
 * Middleware function that chkecks if user is an admin and have enough right.
 */
module.exports = function admin(req, res, next) {
    if(!req.user.isAdmin) return res.status(403).send('Forbidden');

    next();
}

