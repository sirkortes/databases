var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {

        models.messages.get(req, res, function(messages){
          
          res.end(JSON.stringify(messages));
        });

        

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      
      // console.log("\n\nPOSTING MSG\n",req.body);

      models.messages.post(req, res);

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      console.log("GETTING user");
    },
    
    post: function (req, res) {

      models.users.post(req, res);

    }
  }
};

