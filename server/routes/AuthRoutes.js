const { Signup, Login} = require("../controllers/AuthController");

const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");

const router = require("express").Router();

router.post('/',userVerification);
router.post('/profile',getUserProfile);
router.post("/signup", Signup);
router.post("/login",Login);




module.exports = router;