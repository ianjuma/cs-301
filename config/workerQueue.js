module.exports = {
	kue: {
	  prefix: 'q',
	  redis: {
	    port: 6379,
	    host: 'localhost',
	    auth: '',
	    db: 'visiting_tours',
	    options: {
	    }
	  },
     disableSearch: true
	}
};
