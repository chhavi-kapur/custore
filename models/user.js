var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema= new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

userSchema.methods.encryptPassword = function(password) {
    console.log(password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password, null);
};

module.exports = mongoose.model('User', userSchema);