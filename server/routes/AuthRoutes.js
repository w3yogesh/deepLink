const { Signup, Login} = require("../controllers/AuthController");
const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");// My profile and data
const {getUserProfileById, userSearch} = require("../controllers/PublicProfileController")

// user controller
const { connectUsers, getConnections, sentConnections, acceptConnection,ignoreConnection,dropConnection, myConnections, deleteMyConnection,users } = require('../controllers/userController');

// User profile controller (edit profile feature)
const {updateUserProfile, updateEducation, deleteEducation, updateSkill, deleteSkill, updateExperience, deleteExperience} = require("../controllers/updateUserProfile")

//Post Controller
const {createPost, fetchPosts, Postlike, RemovePostLike ,PostComment, fatchComments} = require("../controllers/PostControl");

//compnay controller
const {CreateCompany,Companies, MyCompany,CreateService, CreateJob,GetService,GetJobs,Jobs, ApplyJob} =require("../controllers/CompanyController");

//messages controller
 const {createdMessage, fetchMessages} =  require("../controllers/MessageController");

const router = require("express").Router();


router.post("/signup", Signup);
router.post("/login",Login);
router.post('/',userVerification);
router.post('/profile',getUserProfile); // fetch my profile
router.get('/search', userSearch);

// User Profile Controller
router.put("/updateUserProfile",updateUserProfile);
router.put("/updateEducation",updateEducation);
router.delete("/deleteEducation:educationId",deleteEducation);
router.put("/updateSkill",updateSkill);
router.delete("/deleteSkill:skillId",deleteSkill);

router.put("/updateExperience",updateExperience);
router.delete("/deleteExperience:experienceId",deleteExperience);

router.get('/api/users', users);// List of all users

// User Controller
router.get('/api/connect/:senderId/:recipientId', connectUsers);
router.get('/getConnections:userId', getConnections);
router.get('/sentConnections:userId', sentConnections);
router.get('/api/accept-connection/:senderId/:receiverId', acceptConnection);
router.post('/ignore-connection', ignoreConnection);
router.post('/drop-connection', dropConnection);
router.get('/myConnections:userId', myConnections);
router.delete('/deleteMyConnection/:senderId/:receiverId', deleteMyConnection);
router.get('/userprofile/:userId',getUserProfileById);



//Post Controller
router.post("/post",createPost);
router.get('/api/fetchposts', fetchPosts);
router.put('/api/postLike', Postlike);
router.delete('/api/removePostLike/:userId/:postId', RemovePostLike)
router.put('/api/postComment', PostComment);

// Company controller
// router.post("/company", CreateCompany);
router.get("/companies",Companies);
router.get("/company/:companyId",MyCompany);
router.post("/createService",CreateService);
router.post("/jobposting",CreateJob);
router.get("/service/:companyId",GetService);
router.get("/jobs/:companyId",GetJobs);
router.get("/jobs",Jobs);
router.post("/apply",ApplyJob);


// router.post("/company",upload.single("photo"),CreateCompany)



// User Messages
router.post("/messaging",createdMessage);
router.get("/chats/:userId/:requestId",fetchMessages);


const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage });


router.post("/company",upload.single("photo"),CreateCompany)




module.exports = router;