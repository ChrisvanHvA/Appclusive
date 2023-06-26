// prettier-ignore
const illegalChars = [':','/','?','#','[',']','@','!','$','&',"'",'(',')','*','+',',',';','='];

export default {
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b,
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    ceil: (n) => Math.ceil(n),
    floor: (n) => Math.floor(n),
    round: (n) => Math.round(n),

    log: (value) => console.log(value),

	length: (value) => value?.length,

    toUpperCase: (str) => str?.toUpperCase(),
    toLowerCase: (str) => str?.toLowerCase(),
	capitalize: (str) => str?.charAt(0).toUpperCase() + str?.slice(1),

    spreadAttributes: (attributes) => attributes?.join(' '),

	slugify: (str) => {
		return str
			.replace(/\s/g, '-')
			.toLowerCase()
			.split('')
			.filter((char) => !illegalChars.includes(char))
			.join('');
	},

    concat: function (string, context) {
        const regex = /{{(.*?)}}/g; // Regular expression to match placeholders inside curly brackets

        return string.replace(regex, (_, placeholder) => {
			placeholder = placeholder.trim().replace(/\./g, '?.');
			const value = eval(`context.data.root.${placeholder}`) ?? '';

            return value;
        });
    },

    userArrToIdString: (arr) => {
        if(!arr) return ''
        return arr.map((user) => {
            return user.user_id;
        }).join(';');
    },

	fullNameToInitials: (fullName) => {
		const nameArray = fullName.split(' ');
		const initials = nameArray[0][0] + nameArray[nameArray.length - 1][0];
		return initials.toUpperCase();
	},

	calcProgress: (completed, total) => {
		completed = Number(completed);
		total = Number(total);
		return Math.round((completed / total) * 100);
	},
    sortTasksByLevel: function (tasks, level) {
        return tasks.filter(task => task.wcag_level === level);
    },

    // basically zorgt voor logical operator == !== || etc
    // <3 handlebars
    eq: function () {
        return reduceOp(arguments, (a, b) => a === b);
    },
    ne: function () {
        return reduceOp(arguments, (a, b) => a !== b);
    },
    lt: function () {
        return reduceOp(arguments, (a, b) => a < b);
    },
    gt: function () {
        return reduceOp(arguments, (a, b) => a > b);
    },
    lte: function () {
        return reduceOp(arguments, (a, b) => a <= b);
    },
    gte: function () {
        return reduceOp(arguments, (a, b) => a >= b);
    },
    and: function () {
        return reduceOp(arguments, (a, b) => a && b);
    },
    or: function () {
        return reduceOp(arguments, (a, b) => a || b);
    }
};

// bron: https://gist.github.com/servel333/21e1eedbd70db5a7cfff327526c72bc5
// geen idee hoe dit werkt lol
const reduceOp = (args, reducer) => {
    args = Array.from(args);
    args.pop(); // => options
    const first = args.shift();
    return args.reduce(reducer, first);
};
