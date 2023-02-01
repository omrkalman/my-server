const ResponseError = require("../utility/ResponseError");
const validateSchema = (userInput, schema) => {
    const promise = new Promise((res,rej)=>{
        schema.validateAsync(userInput, { abortEarly:false })
        .then(valid => res(valid))
        .catch(error => {
            let details = error.details.map((item) => item.message);
            rej(new ResponseError('validation', details));
        })
    })
    return promise;
}

module.exports = validateSchema;