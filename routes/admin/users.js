const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../../middlewares/verifyToken.js");
const { getAllUsers } = require("../../controllers/admin/users.js");

const router = express.Router();

//update user
// router.put("/:id", verifyToken, update);

//update user for purchase
// router.put("/purchase/:id", verifyToken, updateuserforpurchase);

//update user for purchase
// router.put("/purchase/special/:id", verifyToken, updateforspecialpackage);

//update user for purchase
// router.put("/purchase/special/earned/:id", verifyToken, updatespecialearned);

//update user referraldata
// router.put("/referral/:id", verifyToken, updatereferralbonus);

//update user referraldata on signup
// router.put("/signup/:id", updatereferral);

//delete user
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//get a user
// router.get("/find/:id", getUserById);

// router.post("/find/one", getUserByProp);

//get all users
router.get("/find", getAllUsers);

module.exports = router;
