const { Signup, Login} = require("../controllers/AuthController");

const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");
const {updateUserProfile} = require("../controllers/updateUserProfile")

const {Posts} = require("../controllers/PostControl");



const router = require("express").Router();


router.post("/signup", Signup);
router.post("/login",Login);
router.post("/post",Posts);
router.post('/',userVerification);
router.post('/profile',getUserProfile);
router.put("/updateUserProfile",updateUserProfile)





module.exports = router;