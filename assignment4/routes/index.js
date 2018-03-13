const dataRoutes = require('./data');

const constructorMethod = app => {
  app.use('/api/people', dataRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  })
}

module.exports = constructorMethod;