const { Signup, Login} = require("../controllers/AuthController");

const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");
const {updateUserProfile, updateEducation, deleteEducation, updateSkill} = require("../controllers/updateUserProfile")

const { connectUsers, getConnections, sentConnections, acceptConnection,ignoreConnection,dropConnection, myConnections, deleteMyConnection,users } = require('../controllers/userController');

//Post Controller
const {createPost, fetchPosts, Postlike,PostComment, fatchComments} = require("../controllers/PostControl");





const router = require("express").Router();


router.post("/signup", Signup);
router.post("/login",Login);
router.post('/',userVerification);
router.post('/profile',getUserProfile);
router.put("/updateUserProfile",updateUserProfile);

router.put("/updateEducation",updateEducation);
// router.delete("/deleteEducation:educationId",deleteEducation);

router.put("/updateSkill",updateSkill);
// router.delete("/deleteSkill",deleteSkill);



router.get('/api/users', users);

// User Controller
router.post('/connect', connectUsers);
router.get('/getConnections:userId', getConnections);
router.get('/sentConnections:userId', sentConnections);
router.post('/accept-connection', acceptConnection);
router.post('/ignore-connection', ignoreConnection);
router.post('/drop-connection', dropConnection);
router.get('/myConnections:userId', myConnections);
router.put('/deleteMyConnection', deleteMyConnection);



//Post Controller
router.post("/post",createPost);
router.get('/api/fetchposts', fetchPosts);
router.put('/api/postLike', Postlike);
router.put('/api/postComment', PostComment);







module.exports = router;