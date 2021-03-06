const Product = require('./product.model');
const User = require('./user.model');
const OrderHistory = require('./orderHistory.model');

var conn = require('./mongo').connect();

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

function getProductByCode(req, res){
  var productCode = req.params.code
  Product.findOne({ code: productCode }).exec(function (err, product) {
    res.send(product);
  });
}

function getOrderHistory(req, res){
  var productCode = req.params.code;
  var userId = req.params.userId;



  const docquery = OrderHistory.find({});
  docquery
    .populate('product')
    .populate('user')
    .exec()
    .then(ohist => {
      res.status(200).json(ohist);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });












}

function buyProduct(req, res){
  var productCode = req.body.productCode;
  var userId = req.body.userId;
  var quantity = req.body.quantity;


  Product.findOne({ code: productCode }).exec(function (err, product) {
    if(product.stock < quantity )
      throw new Error('Insufficient stock');

    User.findOne({ userId: userId }).exec(function (err, user) {
      var oHist = new OrderHistory({ 
        product: product._id,
        user : user._id,
        quantityOrdered: quantity,
        purchaseDate : new Date() 
      });
      
      oHist.save(function(error) {
        if (!error) {
          product.stock -=1;
          product.save(function (err) {
            
          });
        }
      });      








    });
          


  });





  //get product
  //if stock > qty
  //Add record to purchase log
  //reduce stock by qty



  // let session = null;
  // conn
  //   .startSession()
  //   .then(_session => {
  //     session = _session;
  //     session.startTransaction();
  //   })
  //   .then(() => OrderHistory.create([{productCode: productcode, userId:userId, quantityOrdered: quantity, PurchaseDate: new Date()}], { session: session }) )
  //   .then(() => User.findOneAndUpdate({ userId: req.userId }, { $set: {stock : $stock - quantity} }, { new: true }).session(session))
  //   .then(() => session.commitTransaction());
  // res.send(false);

}

module.exports = {
  getProducts,
  getProductByCode,
  buyProduct,
  getOrderHistory
};