const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const getJobDescriptionData = require('../server/data/jobs');

server.get('/api/jobs', (req, res, next) => {
  setTimeout(() => {
    res.status(200).send(getJobDescriptionData.getJobDesctions);
  }, 1500)
});

server.listen(3000, () => {
  console.log('Server Listening on port 3000');
});
