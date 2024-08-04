const router = require('express').Router()



router.get('/', (req, res)=>{

    try {
        res.render('homepage')
    } catch (error) {
      console.error('An error occurred:', error);
    }

})


router.get('/login', (req, res)=>{

    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
      }
    
      res.render('login');
})


module.exports = router