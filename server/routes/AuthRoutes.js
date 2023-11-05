const { Signup, Login} = require("../controllers/AuthController");

const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");
const {updateUserProfile} = require("../controllers/updateUserProfile")

const router = require("express").Router();


router.post("/signup", Signup);
router.post("/login",Login);
router.post('/',userVerification);
router.post('/profile',getUserProfile);
router.put("/updateUserProfile",updateUserProfile)





module.exports = router;