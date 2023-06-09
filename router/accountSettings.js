import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('accountSettings', {
      
    });
});

export default router;
