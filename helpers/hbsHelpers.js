export default {
	calcProgress: (checklists) => {
		const completed = checklists.filter((checklist) => checklist.completed).length;

		return Math.round((completed / checklists.length) * 100);
	},

	toUpperCase: (str) => {
		return str?.toUpperCase();
	},

	spreadAttributes: (attributes) => {
		return attributes?.join(' ');
	},

	// basically zorgt voor logical operator == !== || etc
	// <3 handlebars
	eq: function() { return reduceOp(arguments, (a, b) => a === b); },
	ne: function() { return reduceOp(arguments, (a, b) => a !== b); },
	lt: function() { return reduceOp(arguments, (a, b) => a  <  b); },
	gt: function() { return reduceOp(arguments, (a, b) => a  >  b); },
	lte: function() { return reduceOp(arguments, (a, b) => a  <= b); },
	gte: function() { return reduceOp(arguments, (a, b) => a  >= b); },
	and: function() { return reduceOp(arguments, (a, b) => a  && b); },
	or: function() { return reduceOp(arguments, (a, b) => a  || b); },
};

// bron: https://gist.github.com/servel333/21e1eedbd70db5a7cfff327526c72bc5
// geen idee hoe dit werkt lol
const reduceOp = (args, reducer) => {
	args = Array.from(args);
	args.pop(); // => options
	const first = args.shift();
	return args.reduce(reducer, first);
};