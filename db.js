
// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

// Build the connection string 
var dbURI = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1/users'; 

// Create the database connection 
mongoose.connect(dbURI); 
mongoose.set('debug', true);

var Schema = mongoose.Schema;
var userSchema = new Schema({
	name : String,
	age : Number,
	DOB : String
});
var User = mongoose.model('User', userSchema);

var mitya = new User({
	name : 'Mitya',
	age : 20,
	DOB : '15/12/1987'
});
 
mitya.save(function (err, data) {
	if (err) console.log(err);
	else console.log('Saved : ', data );
});


var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Connection error: ', err);
});
db.once('open', function () {
	console.log('Mongoose connected.');
});