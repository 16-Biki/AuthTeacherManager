// No auth middleware needed since no JWT
module.exports = (req, res, next) => next();
