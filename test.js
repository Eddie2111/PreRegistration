const bcrypt = require('bcrypt');



function HashCheck(password,){

    // the hash here has to come from the mongodb, do it asap!! //
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync('Hatchery', salt)
    const syst = bcrypt.compare(password,hash,(err,res)=>{
        if (res === true){
            return true;
        }
        else{
            return false;
        }
    });
    console.log(syst);
    
}
console.log(HashCheck('Hatchery'));
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
//console.log(hash);

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    if (err){
      // handle error
    }
    if (res){

    //    console.log('success!');
      // Send JWT
    } else {
      // response is OutgoingMessage object that server response http request
  //    console.log('suitcase not'); 
    }
  });
module.exports = HashCheck;