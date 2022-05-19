

function Tokengen(session){

    var date_ob = new Date();
    const generatedat =   parseInt(Math.floor(Date.now() / 1000));
    const expiry = parseInt(Math.floor(Date.now() / 1000)+300);
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000) ;
    const token = {
            otp         : otp,
            generatedat : generatedat,
            expiry      : expiry,
            session     : session
        };

    return token;
}
module.exports = {Tokengen};