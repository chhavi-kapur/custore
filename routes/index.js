var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */

router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    console.log(productChunks)
    res.render('shop/index', { title: 'Custore', products: productChunks });
  });
});

router.get('/add-to-cart/:id', function(req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Product.findById(productId, function(err, product) {
      if(err) {
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
    if(!req.session.cart) {
      return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', function(req, res, next){
    if(!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});
});

module.exports = router;


/*
const connectionString = 'mongodb+srv://myuser:abcd1234@custore-authl.mongodb.net/test?retryWrites=true&w=majority';

const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

async function createUser(username) {
  return new User({
    username,
    created: Date.now()
  }).save()
}

async function findUser(username) {
  return await User.findOne({ username })
}

;(async () => {
  const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  const username = process.argv[2].split('=')[1]

  let user = await connector.then(async () => {
    return findUser(username)
  })

  if (!user) {
    user = await createUser(username)
  }

  console.log(user)
  process.exit(0)
})()

//var username= process.argv[2].split('=')[1];
//console.log('Hello, ', username);
console.log(mongoose.connection.readyState); 



//userSchema.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

module.exports = userSchema;


*/