const Product = require('./product.model');

require('./mongo').connect();

function getProducts(req, res) {
  const docquery = Product.find({});
  docquery
    .exec()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

module.exports = {
  getProducts
};