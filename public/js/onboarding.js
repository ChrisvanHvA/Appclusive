const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        exitOnEsc: true,
        cancelIcon: {
            enabled: true
        }
    }
});

tour.addStep({
    id: 'step1',
    title: 'Hi, welcome to Appclusive!',
    text: 'In this quick onboarding tour we will show you the basics of the application. Click next to continue.',
    // scrollTo: {
    //     behavior: 'smooth',
    //     block: 'center'
    // },
    buttons: [
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step2',
    title: 'Dashboard',
    text: 'You can use the home button to return to the dashboard (the page you are currently on) at any time.',
    attachTo: {
        element: '#onboarding_step-2',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step3',
    title: 'Search',
    text: 'When you are trying to search for something, you can use the search page to find it.',
    attachTo: {
        element: '#onboarding_step-3',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step4',
    title: 'HTML Validator',
    text: 'Quickly want to validate your HTML? Use the build in HTML validator to check your code.',
    attachTo: {
        element: '#onboarding_step-4',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step5',
    title: 'Settings',
    text: 'You can use the settings page to change your account settings. Try adding a profile picture!',
    attachTo: {
        element: '#onboarding_step-5',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step6',
    title: 'Projects',
    text: 'You can create a new project here!',
    attachTo: {
        element: '#onboarding_step-6',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'step6',
    title: 'Projects',
    text: 'If someone has already created a project, you can join it here using the project ID!',
    attachTo: {
        element: '#onboarding_step-7',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tour.back
        },
        {
            text: 'Complete',
            action: tour.complete
        }
    ]
});

tour.start();