import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	projects.forEach((project) => {
		project.completedChecklists = getCompletedChecklists(project.checkLists);
	});

    res.render('dashboard', {
        projects: projects,
    });
});

const getCompletedChecklists = (checklists) => {
	return checklists.filter((checklist) => checklist.completed).length;
};

let projects = [
    {
        name: 'project1',
        status: 'New',
        step: '1. onderzoek',
        checkLists: [
            {
                name: 'taak1',
                completed: true,
            },
            {
                name: 'taak2',
                completed: true,
            },
            {
                name: 'taak3',
                completed: true,
            },
        ],
        teamMembers: [
            {
                name: 'Jeroen',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Bert',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Klaas',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
        ],
    },
	{
        name: 'project1',
        status: 'Started',
        step: '1. onderzoek',
        checkLists: [
            {
                name: 'taak1',
                completed: false,
            },
            {
                name: 'taak2',
                completed: false,
            },
            {
                name: 'taak3',
                completed: true,
            },
        ],
        teamMembers: [
            {
                name: 'Jeroen',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Bert',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Klaas',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
        ],
    },
	{
        name: 'project1',
        status: 'Done',
        step: '1. onderzoek',
        checkLists: [
            {
                name: 'taak1',
                completed: false,
            },
            {
                name: 'taak2',
                completed: true,
            },
            {
                name: 'taak3',
                completed: true,
            },
        ],
        teamMembers: [
            {
                name: 'Jeroen',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Bert',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Klaas',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
        ],
    },
	{
        name: 'project1',
        status: 'New',
        step: '1. onderzoek',
        checkLists: [
            {
                name: 'taak1',
                completed: false,
            },
            {
                name: 'taak2',
                completed: true,
            },
            {
                name: 'taak3',
                completed: true,
            },
        ],
        teamMembers: [
            {
                name: 'Jeroen',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Bert',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Klaas',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
        ],
    },
	{
        name: 'project1',
        status: 'New',
        step: '1. onderzoek',
        checkLists: [
            {
                name: 'taak1',
                completed: false,
            },
            {
                name: 'taak2',
                completed: true,
            },
            {
                name: 'taak3',
                completed: true,
            },
        ],
        teamMembers: [
            {
                name: 'Jeroen',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Bert',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
            {
                name: 'Klaas',
                imgUrl: 'https://fastly.picsum.photos/id/820/40/40.jpg?hmac=kZkyBeRLe53RBNNVxzfiC2csALM9zByR2aPHGRtIBpo',
            },
        ],
    },
];

export default router;
