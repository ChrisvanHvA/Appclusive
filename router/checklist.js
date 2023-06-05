import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('checklist', {
        tasks: tasks
    });
});

let tasks = [
    {
        name: 'task1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis.',
        tips: [
            {
                name: 'tip1',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
            {
                name: 'tip2',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
        ],
        users: [
            {
                name: 'user1',
            },
            {
                name: 'user2',
            },
            {
                name: 'user3',
            },
            {
                name: 'user4',
            },
            {
                name: 'user5',
            },
        ],
        completed: false,
    },
    {
        name: 'task2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis.',
        tips: false,
        users: [
            {
                name: 'user1',
            },
            {
                name: 'user2',
            }
        ],
        completed: false,
    },
    {
        name: 'task3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis.',
        tips: [
            {
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
            {
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
        ],
        users: [
            {
                name: 'user1',
            },
            {
                name: 'user2',
            },
            {
                name: 'user3',
            },
            {
                name: 'user4',
            },
            {
                name: 'user5',
            },
        ],
        completed: false,
    },
    {
        name: 'task4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis.',
        tips: [
            {
                name: 'tip1',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
            {
                name: 'tip2',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis quod maxime itaque nisi repellat iste voluptas. Debitis cum quisquam placeat dolorum consequatur quasi quibusdam dolorem similique, ipsum, consectetur autem.',
            },
        ],
        users: false,
        completed: true,
    },
];


export default router;
