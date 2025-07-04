const sorveteController = require('./sorveteController');

module.exports = (app) => {
  app.get('/sorvetes', sorveteController.get);            
  app.get('/sorvetes/:id', sorveteController.getById);    
  app.post('/sorvetes', sorveteController.post);          
  app.put('/sorvetes/:id', sorveteController.put);        
  app.delete('/sorvetes/:id', sorveteController.delete);  
};
