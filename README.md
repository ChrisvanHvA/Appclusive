# Meesterproef Appclusive

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![handlebars badge](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

![appclusive logo](https://github.com/ChrisvanHvA/Appclusive/assets/90341211/97bc65a3-8953-41f4-aa65-2936546a81ce)

## Live version

[Live version](https://appclusive-production.up.railway.app/landing)

## Case

Appclusive is an online web tool for UX designers and organizations, designed to check digital products for accessibility. UX-Designers need to be able to check if the project lives up to all the WCAG-standards and will therefore be closer to having created an accessible design. This web tool is designed to motivate, and make it easier for designers to apply accessibility to their digital products based on guidelines. Since we already have a design, it's our job is to bring this design to life with code.

![appclusive screen](https://github.com/ChrisvanHvA/Appclusive/blob/154bc6e014a18e5908a2101605e3c484d7af8795/public/images/ssreadme.png)

## Contents 📑

- [Features](https://github.com/ChrisvanHva/Appclusive#features) The ✨special✨ things
- [Documentation](https://github.com/ChrisvanHva/Appclusive#documentation) You wanna know everything?!
- [User stories](https://github.com/ChrisvanHva/Appclusive#user-stories) The goals
- [Installation](https://github.com/ChrisvanHva/Appclusive#installation) Let's get started
- [License](https://github.com/ChrisvanHva/Appclusive#license) This project belongs to some talented people
- [The problem](https://github.com/ChrisvanHva/Appclusive#the-problem) What are we looking to solve?
- [The solution](https://github.com/ChrisvanHva/Appclusive#the-solution) How did we solve it?
- [Our client](https://github.com/ChrisvanHva/Appclusive#our-client) Credits
- [Wishlist](https://github.com/ChrisvanHva/Appclusive#wishlist) Future plans

## Features

|               Feature             | Progress |
| :-------------------------------: | :------: |
| Login / register                  |    ✅    |
| Create project                    |    ✅    |
| Generate checklists based on WCAG |    ✅    |
| Invite users to project           |    ✅    |
| Join a project                    |    ✅    |
| Assign users to checklist         |    ✅    |
| Change user/project settings      |    ✅    |
| Project search                    |    ✅    |
| HTML validator                    |    ✅    |
| Dark mode!!!                      |    ✅    |

## Documentation

The rest of the documentation for the Appclusive project can be found in our [Wiki](https://github.com/ChrisvanHvA/Appclusive/wiki).

## User stories

1. As an UX-Designer, I would like to access all the information about accessibility in one place, so I don't waste my time searching for this information.

2. As a project-manager, I want to distribute tasks so that I can see who does what about digital accessibility within the project and the organization.

3. As an UX-Designer, I would want to have my tasks split up into small steps. So I know where to start in order to make my digital project more accessible.

## Installation

1. Clone the repository

```bash
$ git clone git@github.com:ChrisvanHvA/Appclusive.git
```

2. Install dependencies

```bash
$ npm install
```

3. Run the server

```bash
$ npm run start:dev
```

4. Make sure your .env file is setup correctly and contains the following keys (contact us for details)

```bash
SUPABASE_KEY=
SUPABASE_URL=

SUPABASE_HOST=
SUPABASE_DB=
SUPABASE_PORT=
SUPABASE_USER=
SUPABASE_PASS=
DATABASE_URL=

SUPABASE_IMAGE_BUCKET=
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## The problem

We need to build an online application called Appclusive that helps UX-designers and organizations ensure the accessibility of their digital products. The tool should provide an application where designers can easily access all the necessary accessibility information, saving time on searching. It should also help project managers distribute tasks and track accessibility progress. Additionally, the application should break down accessibility tasks into smaller steps, helping designers prioritize and improve the accessibility of their projects. For this to work the application must include some features. The most important ones are being able to distribute tasks, breakdown tasks into smaller steps and for us to provide an easily accessible source of information about the WCAG-guidelines.

## The solution

TADAAA!!! ✨[Link](https://appclusive-production.up.railway.app/landing)
✨

Just kidding.

### All information in one place

We solved this problem by creating clear instructions on how to ensure the accessibility of your digital products. We created our own API with all the WCAG-guidelines in plain simple language because the "real" WCAG-guidelines contain far to complex instructions. We also decided to add some tips to each of our steps to make sure you *really* understand why these things are necessary to apply. 

For each project you now have several categories, each with it's own checklist containing the WCAG-standards. This creates (at least we hope!) a clear and clean overview of what has been done and what is still on your to-do list. You can also easily see on what level of accessibility you are working on and level up if you want to. Furthermore we made a dashboard for easy access and overview of all the projects.

### The task distributing problem

We solved this problem by making it possible for project-managers to be able to assign tasks to team members. It is now possible for users to invite other others to certain projects. They can do so by copying an invite code and sharing said code (even those who don't use Appclusive yet). The invited user can then create an account and then click on the "join project" button on the dashboard.

If project-managers want to assign team members to specific tasks, they can do so by clicking on the assign user button on every step within a category of a project. You can see al the designers working on the whole project and pick an user to assign the task to.

### Baby steps

We split up each category into small checklist items per WCAG-guideline. So you have a clear and clean overview of what has been done and what is still on your to-do list. We made the overview easier by creating checklist items that you can check, so you know what has been done en wat still needs to be done. We also decided to split the WCAG-guidelines up into categories, this makes it easier to navigate and also to assigns tasks to designers/ developers.

## Our client

Our client is Sanne Duinker, an alumni of CMD. Sanne designed Appclusive for her graduation project. For us she already had an entire design in Figma and a styleguide to work with.

## Wishlist

As you might know, project are almost never finished since we can always improve or do things a little different or better with more time. Therefore we have created a wishlist with features we might want to implement one day...

- A JavaScript client-side form validator
- Level / customization of the project cards
- Create onboarding for the first time experience
- Being able to filter on level within categories
- Sort on tasks assigned to you
- Live updating on checklist items
- Remove categories from project that are not relevant
