 

// const express = require('express');
// const router = express.Router();

// // 🔥 Auth middleware import
// const authMiddleware = require('../middleware/authMiddleware'); 
//  const { 
//     activatePackage, 
//     getUserPackages, 
//  } = require('../controllers/packageController');


// // Yeh tumhara POST route hai (Normal 5% Package kharidne/activate karne ke liye)
// router.post('/activate', authMiddleware, activatePackage);

// // 🔥 YEH RAHA NAYA POST ROUTE (Auto Compound 6% Package activate karne ke liye)
 
// // User ke packages list karne ke liye GET route
// router.get('/user/:userId', authMiddleware, getUserPackages);


 

// module.exports = router;



const express = require('express');
const router = express.Router();

// Auth middleware
const authMiddleware = require('../middleware/authMiddleware');

// Package controller
const {
  activatePackage,
  activateSetupPackageByMaster,
  getUserPackages,
} = require('../controllers/packageController');

// Normal user package activation
router.post(
  '/activate',
  authMiddleware,
  activatePackage
);

// Master: One-time package activation for own Setup ID
router.post(
  '/master-activate-setup-package',
  authMiddleware,
  activateSetupPackageByMaster
);

// User packages list
router.get(
  '/user/:userId',
  authMiddleware,
  getUserPackages
);

module.exports = router;
