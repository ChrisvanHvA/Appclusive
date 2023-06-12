const setHeadData = async (req, res, next) => {
	const path = req.originalUrl.split('?')[0];

	res.locals.head = data[path] ?? data.fallback;

	next();
};

const data = {
	'/': {
		title: 'Dashboard',
		description: '',
		scripts: []
	},
	'/new-project': {
		title: 'New Project | Appclusive',
		description: '',
		scripts: ['createProject']
	},
	'/checklist': {
		title: 'Checklist',
		description: '',
		scripts: ['checklist']
	},
	'/categories': {
		title: 'Categories',
		description: '',
		scripts: ['categories']
	},
	'/login': {
		title: 'Login',
		description: '',
		scripts: []
	},
	'/register': {
		title: 'Register',
		description: '',
		scripts: ['validator' ]
	},
	'/profile': {
		title: 'Profile',
		description: '',
		scripts: []
	},
	fallback: {
		title: 'Whoopsy',
		description: 'whoops',
		scripts: []
	},
};

export { setHeadData };
