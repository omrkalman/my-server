const jwt = require('../config/jwt');

module.exports = async(req,res,next) => {
    try {
        const payload = await jwt.verifyToken(req.headers?.token);
        console.log(payload);
        // Pass data to chain
        req.userData = payload.id;
        // Run the next part of the chain
        next();
    } catch(error) {
        // Unauthorized
        console.log(error);
        res.status(401).json(error);
    }
}