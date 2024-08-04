const router = require('express').Router()



router.get('/', (req, res)=>{

    try {
        res.render('homepage')
    } catch (error) {
      console.error('An error occurred:', error);
    }

})


router.get('/login', (req, res)=>{

    try {
        res.render('login')
    } catch (error) {
      console.error('An error occurred:', error);
    }

})


module.exports = router