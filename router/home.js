import express from 'express';
const router = express.Router();

// import projectModel from '../models/projectModel.js';
// import wcagController from '../controllers/wcagController.js';
// import wcagModel from '../models/wcagModel.js';

router.get('/', (req, res) => {
	projects.forEach((project) => {
		project.completedChecklists = getCompletedChecklists(project.checkLists);
	});

    res.render('dashboard', {
        projects: projects
    });
});


router.get('/wcag', async (req, res) => {

    // const data = await wcagController.createWCAGOverview();
    // const WCAGModel = new wcagModel();
    // const data = await WCAGModel.listWCAGItemsByParentId(2);

    res.send('hehe');
});

router.get('/projects', async (req, res) => {
	const ProjectModel = new projectModel();
	const projects = await ProjectModel.listProjects();

	console.log(projects);

	res.send(projects);
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
