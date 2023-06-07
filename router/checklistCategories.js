import express from 'express';
// experimental
// import tasks from "../public/wcag.json" assert { type: "json" };
const router = express.Router();

router.get('/', (req, res) => {
    res.render('checklistCategories', {
      
    });
});

router.post('/submit', (req, res) => {
    console.log(req.body);
    res.json('hiii');
});

export default router;
