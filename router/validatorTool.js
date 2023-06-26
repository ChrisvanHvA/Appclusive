import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('validatorTool', {
        ...res.locals,
        title: 'Validator',
    });
});



export default router;
