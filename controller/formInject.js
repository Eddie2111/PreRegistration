const User = require('../model/user');

var temp = new User({
    name: 'Aston Cooper',
    password: 'Hatchery',
    email: 'trianmery@gmail.com',
    phonenumber: '0175489620',
    cloudinary_id: 'https:www.turner.com',
    category: 'Chemography',
    avatar: 'https://www.turner.pak',
    gallery: ['array1'],
    date: Date.now()
});
//temp.save (function (err, user) { if (err) return console.error(err); console.log(user); });