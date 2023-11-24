const multer = require("multer");
const { Signup, Login, LoginWithGoogle} = require("../controllers/AuthController");
const {userVerification} = require("../middlewares/AuthMiddleware");
const {getUserProfile} = require("../controllers/getUserProfile");// My profile and data
const {getUserProfileById, userSearch} = require("../controllers/PublicProfileController")

// user controller
const { connectUsers, getConnections, sentConnections, acceptConnection,ignoreConnection,dropConnection, myConnections, deleteMyConnection,users,Notification } = require('../controllers/userController');

// User profile controller (edit profile feature)
const {updateUserProfile, addEducation,editEducation, deleteEducation, addSkill, editSkill,deleteSkill, addExperience,editExperience, deleteExperience, UploadProfile,UploadBackground,addEndorsement} = require("../controllers/updateUserProfile");

//Post Controller

const {createCompanyPost,CompanyPostlike,RemoveCompanyPostLike,CompanyPostComment,fetchCompanyPosts,fetchCompanyPostsSpecific,deleteCompanyPosts} = require("../controllers/CompanyPostControl.js")
const {createPost, fetchPosts, fetchLikeData, postReaction, removePostReaction, updateReaction, Postlike, RemovePostLike ,PostComment,deletePosts,fetchPostsSpecific} = require("../controllers/PostControl");

//compnay controller
const {CreateCompany,Companies, MyCompany,UploadLogo, UploadCover, CreateService, CreateJob,GetService,GetJobs,Jobs, ApplyJob,withdrawJob,GetCompanies,getAppliedUsers} = require("../controllers/CompanyController");

//messages controller
 const {createdMessage, fetchMessages} =  require("../controllers/MessageController");

const router = require("express").Router();


router.post("/signup", Signup);
router.post("/login",Login);
router.post("/LoginWithGoogle",LoginWithGoogle);
router.post('/',userVerification);
router.post('/profile',getUserProfile); // fetch my profile
router.get('/search', userSearch);

// User Profile Controller
router.put("/updateUserProfile",updateUserProfile);

router.put("/addEducation",addEducation);
router.put("/editEducation",editEducation);
router.delete("/deleteEducation:educationId",deleteEducation);

router.put("/addSkill",addSkill);
router.put("/editSkill",editSkill);
router.delete("/deleteSkill:skillId",deleteSkill);

router.put("/addExperience",addExperience);
router.put("/editExperience",editExperience);
router.delete("/deleteExperience:experienceId",deleteExperience);

router.get('/api/users', users);// List of all users

// User Controller
router.get('/api/connect/:senderId/:recipientId', connectUsers);
router.get('/api/getConnections:userId', getConnections);
router.get('/api/sentConnections:userId', sentConnections);
router.get('/api/accept-connection/:senderId/:receiverId', acceptConnection);
router.post('/api/ignore-connection', ignoreConnection);
router.post('/api/drop-connection', dropConnection);
router.get('/api/myConnections:userId', myConnections);
router.delete('/api/deleteMyConnection/:senderId/:receiverId', deleteMyConnection);
router.get('/userprofile/:userId',getUserProfileById);
router.put('/endorsement/:skillId/:endorserUserId',addEndorsement);


const PostImage = multer.diskStorage({
  destination: "./uploads/user/post",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const postImage = multer({ storage:PostImage });

//Post Controller
router.post("/createPost",postImage.single("image"),createPost);
router.get('/api/fetchposts', fetchPosts);
router.get('/api/fetchlike/:likeId', fetchLikeData);
router.put('/api/postReaction', postReaction);
router.delete('/api/removePostReaction/:userId/:postId', removePostReaction);
router.put('/api/updateReaction/:likeId/:reactionType', updateReaction);
router.put('/api/postLike', Postlike);
router.delete('/api/removePostLike/:userId/:postId', RemovePostLike);
router.put('/api/postComment', PostComment);


const CompanyPostImage = multer.diskStorage({
  destination: "./uploads/company/post",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const companyPostImage = multer({ storage:CompanyPostImage });

//company post controller
router.post("/companypost",companyPostImage.single("image"),createCompanyPost);
router.get('/api/fetchcompanyposts',fetchCompanyPosts);
router.put('/api/companypostLike',CompanyPostlike);
router.delete('/api/removecompanyPostLike/:userId/:postId',RemoveCompanyPostLike);
router.put('/api/postcompanyComment',CompanyPostComment);
router.delete("/api/deletepost/:userId/:postId",deletePosts);
router.get("/api/fetchpost/:userId",fetchPostsSpecific);

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
router.post("/withdraw",withdrawJob);
router.get("/mycompanies/:companyId",GetCompanies);



router.get("/appliedusers/:companyId",getAppliedUsers);
router.get("/api/fetchcompanypost/:companyId",fetchCompanyPostsSpecific);
router.delete("/api/deleteCompanyPost/:companyId/:postId",deleteCompanyPosts);



// router.post("/company",upload.single("photo"),CreateCompany)



// User Messages
router.post("/messaging",createdMessage);
router.get("/chats/:userId/:requestId",fetchMessages);


//Notifications

router.get("/getNotifications/:userId",Notification);


const companyImages = multer.diskStorage({
  destination: "./uploads/company",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const company = multer({ storage:companyImages });

router.post("/createCompany/:userId",company.single('photo'),CreateCompany);
router.post("/uploadLogo",company.single("photo"),UploadLogo);
router.post("/uploadCover",company.single("photo"),UploadCover);

// company.single('photo'), 

const userProfile = multer.diskStorage({
  destination: "./uploads/user/profile",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const userprofile = multer({ storage:userProfile });
router.post("/uploadUserProfile",userprofile.single("photo"),UploadProfile);
router.post("/uploadBackground",userprofile.single("photo"),UploadBackground);




module.exports = router;