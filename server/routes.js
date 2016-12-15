/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/funzones', require('./api/funzone'));
  app.use('/api/feedbacks', require('./api/feedback'));
  app.use('/api/colleges', require('./api/college'));
  app.use('/api/marqueeNotifs', require('./api/marqueeNotif'));
  app.use('/api/teams', require('./api/team'));
  app.use('/api/eventTabs', require('./api/eventTab'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/eventLists', require('./api/eventList'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/users', require('./api/user'));
  // app.use('/api/website-users', require('./api/websiteUser'));

  // app.use('/authWebsite', require('./authWebsite'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      // console.log(app.get('appPath'));
      // res.sendfile(app.get('appPath') + '/index.html');
      res.sendFile('index.html', { root: app.get('appPath') });
    });
};
