const bcrypt = require('bcrypt');

function serviceValidation(data){
    const password = data.password;
    data.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return data;
}
module.exports = {serviceValidation};