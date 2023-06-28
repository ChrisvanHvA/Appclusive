import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('validatorTool', {
        ...res.locals,
        title: 'Validator',
        loading: true
    });
});

router.post('/result', async (req, res) => {
    const data = req.body.html

    const validatedHTML = await validateHTML(data)
    
    res.render('validatorTool', {
        ...res.locals,
        title: 'Validator',
        validatorMessages: validatedHTML,
        html: data,
        loading: true
    })
})

async function validateHTML(html) {
    console.log('Validating html...')
    try {
        const response = await fetch('https://validator.w3.org/nu/?out=json', {
            method: 'POST',
            headers: {
                'Content-type':
                'text/html; charset=UTF-8'
            },
            body: html
        })
        const data = await response.json();

        // convert "<" and ">" to html entities within messages.extract

        data.messages.forEach(message => {
            message.extract = message.extract.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            // remove /n
            message.extract = message.extract.replace(/\n/g, '')
        })
    
        console.log('Validation complete.')
        
        return data;
    }catch(err) {
        console.log(err)
    }
}

  


export default router;
