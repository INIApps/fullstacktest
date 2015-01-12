'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    //process.env.MONGOLAB_URI ||
            //process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
<<<<<<< HEAD
            'mongodb://localhost/fullstack014-dev'
=======
            uri: 'mongodb://localhost/fullstack014-dev'
>>>>>>> 6c66e18a8f5acc9ecd7951228ac88f0b9e284afc
  }
};
