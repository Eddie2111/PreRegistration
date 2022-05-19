const bcrypt = require('bcrypt');

function sessiongen(){
    const saltRounds = 10;
    const myPlaintextPassword = process.env.secret_key;     
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash;
}

module.exports = {sessiongen};