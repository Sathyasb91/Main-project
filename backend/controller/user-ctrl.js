const userSchema = require("../model/user-schema");
const express = require("express");
const route = express.Router();
const multer = require("multer");
const orderSchema = require("../model/order-schema");

const storage = multer.diskStorage({
  destination: "./imageupload",
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage }).single("image");

const usercontroller = async (req, res) => {
  try {
    console.log("Received signup data:", req.body);
    console.log("Received file:", req.file);

    const newUser = new userSchema({
      username: req.body.username,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      phoneno: req.body.phoneno,
      address: req.body.address,
      image: req.file ? req.file.filename : null,
    });

    const existing = await userSchema.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ msg: "Email id already exists" });
    }

    await newUser.save();

    res.status(200).json({
      status: 200,
      msg: "User details entered successfully",
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ msg: error.message });
  }
};

//find all user
const userslist = async (req, res) => {
  try {
    const userli = await userSchema.find();
    res.status(200).json(userli);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

//find by id
const finduserbyid = (req, res) => {
  const findbyid = req.params.id;
  userSchema
    .findById({ _id: findbyid })
    .then((result1) => {
      res.status(200).json({
        data: result1,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
      });
    });
};

//find by id and update
const finduserbyidandupdate = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {
      username: req.body.username,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      phoneno: req.body.phoneno,
      address: req.body.address,
    };

    //  If image uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updateuser = await userSchema.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updateuser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updateuser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

//find by id and delete
const finduserbyidanddelete = (req, res) => {
  const findbyidanddelete = req.params.id;
  userSchema
    .findByIdAndDelete({ _id: findbyidanddelete })
    .then((result2) => {
      res.status(200).json({
        msg: "User deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
      });
    });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const result3 = await userSchema.findOne({ email: email });
  console.log(result3);
  if (!result3) {
    return res.status(400).json({
      msg: "User not found",
    });
  }
  if (result3.password !== password) {
    return res.status(400).json({
      msg: " Invalid password",
    });
  }
  return res.status(200).json({
    msg: "Successfully logged in",
    id: result3._id.toString(),
  });
};

const wishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User Id is required" });
    }
    const user = await userSchema.findById(userId).populate("wishlist");

    if (!user.wishlist || user.wishlist.length === 0) {
      return res.status(404).json({ msg: "No items found in wishlist" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const addtowishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({ msg: "Missing userId or productId" });
    }
    const user = await userSchema.findById(userId);
    if (!user)
      return res.status(404).json({
        msg: "User not found",
      });

    if (user.wishlist.includes(productId)) {
      return res.status(200).json({ msg: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();
    return res.status(200).json({
      msg: "Product addded to wishlist",
    });
  } catch (error) {
    console.error("Wishlist error:", error);
    res.status(500).json({ msg: "Failed to add to wishlist" });
  }
};

const removefromwishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId,
    );
    await user.save();

    return res.status(200).json({ msg: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ msg: "Error removing from wishlist" });
  }
};

const cart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "UserId is required" });
    }
    const user = await userSchema.findById(userId).populate("cart.productId");
    if (!user || user.cart.length === 0) {
      return res.status(200).json({ msg: "Cart is empty " });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch cart" });
  }
};

const addtocart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({ msg: "Missing userId or productId" });
    }
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const item = user.cart.find(
      (c) => c.productId && c.productId.toString() === productId,
    );

    if (item) {
      item.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ msg: " Product added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ msg: "Failed to add to cart" });
  }
};

const removefromcart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.cart = user.cart.filter((c) => c.productId.toString() !== productId);
    await user.save();

    res.status(200).json({ msg: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ msg: " Error removing product from cart" });
  }
};

const updateCount = async (req, res) => {
  const { userId, productId, qty } = req.body;

  try {
    if (!userId || !productId || typeof qty !== "number") {
      return res.status(400).json({ msg: " Missing userId or productId" });
    }
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const item = user.cart.find(
      (c) => c.productId && c.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }
    item.quantity += qty;
    if (item.quantity <= 0) {
      user.cart = user.cart.filter((c) => c.productId.toString() !== productId);
    }
    await user.save();
    return res.status(200).json({ msg: " Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const placeOrder = async (req, res) => {
  const { userId, address } = req.body;

  try {
    const user = await userSchema.findById(userId).populate("cart.productId");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    let total = 0;

    const items = user.cart.map((item) => {
      total += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    const newOrder = new orderSchema({
      userId,
      items,
      total,
      address,
    });

    await newOrder.save();

    // clear cart after order
    user.cart = [];
    await user.save();

    res.status(200).json({ msg: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to place order" });
  }
};

const getOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderSchema
      .find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
};

module.exports = {
  upload,
  usercontroller,
  userslist,
  finduserbyid,
  finduserbyidandupdate,
  finduserbyidanddelete,
  login,
  wishlist,
  addtowishlist,
  removefromwishlist,
  cart,
  addtocart,
  removefromcart,
  updateCount,
  placeOrder,
  getOrders
};
