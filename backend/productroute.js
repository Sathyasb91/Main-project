var express = require('express');
const route = express.Router();
const controller = require('./controller/prod-ctrl')
route.post('/products', controller.upload ,controller.productcontrol);
route.get('/productlist', controller.productlist);
route.get('/findprodbyid/:id', controller.findprodbyid);
route.put('/editproduct/:id', controller.findprodbyidandupdate);
route.delete('/deleteproduct/:id', controller.findprodbyidanddelete);

const controller1 = require('./controller/user-ctrl')
route.post('/users', controller1.upload, controller1.usercontroller);
route.get('/userslist', controller1.userslist);
route.get('/usersbyid/:id', controller1.finduserbyid);
route.put('/editusers/:id', controller1.upload, controller1.finduserbyidandupdate);
route.delete('/deleteusers/:id', controller1.finduserbyidanddelete);
route.post('/login', controller1.login);
route.post('/wishlist', controller1.wishlist);
route.post('/addtowishlist', controller1.addtowishlist);
route.delete('/removefromwishlist/:userId/:productId', controller1.removefromwishlist);

route.post('/cart', controller1.cart);
route.post('/addtocart', controller1.addtocart);
route.delete('/removefromcart/:userId/:productId', controller1.removefromcart);
route.post('/updatecount',controller1.updateCount);

route.post('/placeorder', controller1.placeOrder);
route.post('/orderhistory', controller1.getOrders);
route.get("/category/:category", controller.getByCategory);


module.exports = route