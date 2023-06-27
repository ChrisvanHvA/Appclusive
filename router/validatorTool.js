import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('validatorTool', {
        ...res.locals,
        title: 'Validator',
    });
});

router.post('/result', async (req, res) => {
    // console.log(req)
    const data = req.body.html

    const validatedHTML = await validateHTML(data)

    console.log(validatedHTML)
    
    res.render('validatorTool', {
        ...res.locals,
        title: 'Validator',
        validatorMessages: validatedHTML
    })
})

// function validateHTML(html) {
//     fetch('https://validator.w3.org/nu/?out=json', {
//         method: 'POST',
//         headers: {
//             'Content-type':
//             'text/html; charset=UTF-8'
//         },
//         body: html
//     })
//     .then(res => 
//         res.json())
//     .then(result => {
//         return result
//     })
//     .catch(err => console.error('Error:',
//     error));
// }

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
    
        return data;
    }catch(err) {
        console.log(err)
    }
}


export default router;
