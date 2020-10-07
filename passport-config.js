const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");


function inititalize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, callback) =>{
        const user = getUserByEmail(email)
        if (user == null) {
            return callback(null, false, {message: "No user with that email"});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return callback(null, user);
            } else {
                return callback(null, false, {message: "Incorrect password"});
            }
        } catch (err){
            return callback(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: "email"},
    authenticateUser));

    passport.serializeUser((user, callback) => callback(null, user.id))
    passport.deserializeUser((id, callback) => {
        callback(null, getUserById(id));
    })
}

module.exports = inititalize;