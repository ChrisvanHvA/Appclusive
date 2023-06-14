export default {
	divide: (a, b) => a / b,
	multiply: (a, b) => a * b,
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	ceil: (n) => Math.ceil(n),
	floor: (n) => Math.floor(n),
	round: (n) => Math.round(n),

	log: (value) => console.log(value),
	
	toUpperCase: (str) => str?.toUpperCase(),
	toLowerCase: (str) => str?.toLowerCase(),
	spreadAttributes: (attributes) => attributes?.join(' '),

	concat: function(string, context) {
		var regex = /{{(.*?)}}/g; // Regular expression to match placeholders inside curly brackets
        return string.replace(regex, function (match, placeholder) {
            try {
                var value = eval('context.data.root.' + placeholder.trim()); // Evaluate the placeholder expression
                return value !== undefined ? value : match; // Replace the placeholder or keep the original match if the value is undefined
            } catch (error) {
                console.error('Error evaluating placeholder:', error);
                return match; // Keep the original match if an error occurs during evaluation
            }
        });
	},

	// basically zorgt voor logical operator == !== || etc
	// <3 handlebars
	eq: function(){ return reduceOp(arguments, (a, b) => a === b)},
	ne: function() {return reduceOp(arguments, (a, b) => a !== b)},
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