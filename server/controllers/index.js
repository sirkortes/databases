var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
    	console.log("\n\nGETTING message");
    }, // a function which handles a get request for all messages
    post: function (req, res) {
    	
    	console.log("\n\nPOSTING MSG\n",req.body);

    	models.messages.post(req.body)

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    	console.log("GETTING user");
    },
    
    post: function (req, res) {

    	console.log("\n\nPOSTING user\n", req.body);
    	models.users.post(req.body);
    	// this gets called first,
    	// and stores user on the db

    	// then message gets called

    }
  }
};

