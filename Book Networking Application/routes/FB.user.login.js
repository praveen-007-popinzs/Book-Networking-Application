//For this API user login has handled for both cases, 
//user can register and login
//user can login via FB

const express = require('express');
const axios = require('axios');
const router = express.Router();

//in place of APP_ID and APP_SECRET USE YOUR Own credential of facebook backend
const APP_ID = 'APP_ID'; //cant provide being a crucial information
const APP_SECRET = 'APP_SECRET';
const REDIRECT_URI = '<http://localhost:3000/auth/facebook/callback>';

// Facebook login flow
router.get('/auth/facebook', (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
  res.redirect(url);
});

// Callback URL for handling the Facebook Login response
router.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);

    const { access_token } = data;

    const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

    // Code to handle user authentication and retrieval using the profile data

    res.redirect('/');
  } catch (error) {
    console.error('Error:', error.response.data.error);
    res.redirect('/login');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  res.redirect('/login');
});

module.exports = router;