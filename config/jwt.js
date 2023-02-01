const jwt = require('jsonwebtoken');

const generateToken = (payload, exp = '30d') => {
    return new Promise((res, rej)=>{
        jwt.sign(payload, process.env.JWTSECRETKEY, {expiresIn:exp}, (err,token)=>{
            if (err) rej(err);
            else res(token);
        })
    })
}

const verifyToken = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, SECRET, (err,payload) => {
                if (err) rej(err);
                else res(payload);
            }
        );
    });
};

module.exports = {
    generateToken,
    verifyToken,
};