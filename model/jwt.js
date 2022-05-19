var jwt = require('jsonwebtoken');

function jwtoken(){
const apo = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
  }, 'secret');
  return apo;
}
module.exports = jwtoken;

    
