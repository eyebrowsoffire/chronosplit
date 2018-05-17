const ServerSession = require('./serverSession.js');
const sampleTemplate = require('./sampleTemplate.json');

var session = new ServerSession(8080, sampleTemplate);
session.listen();
