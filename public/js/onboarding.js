const tourDesktop = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        exitOnEsc: true,
        cancelIcon: {
            enabled: true
        }
    }
});

tourDesktop.addStep({
    id: 'step1',
    title: 'Hi, welcome to Appclusive!',
    text: 'In this quick onboarding tour we will show you the basics of the application. Keep in mind that you can always reactivate this tour in your settings! Click next to continue.',
    buttons: [
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step2',
    title: 'Dashboard',
    text: 'You can use the home button to return to the dashboard (the page you are currently on) at any time.',
    attachTo: {
        element: '#onboarding_step-2-desktop',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step3',
    title: 'Search',
    text: 'When you are trying to search for something, you can use the search page to find it.',
    attachTo: {
        element: '#onboarding_step-3-desktop',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step4',
    title: 'HTML Validator',
    text: 'Quickly want to validate your HTML? Use the build in HTML validator to check your code.',
    attachTo: {
        element: '#onboarding_step-4-desktop',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step5',
    title: 'Settings',
    text: 'You can use the settings page to change your account settings. Try adding a profile picture!',
    attachTo: {
        element: '#onboarding_step-5-desktop',
        on: 'right'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step6',
    title: 'Projects',
    text: 'You can create a new project here!',
    attachTo: {
        element: '#onboarding_step-6-desktop',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Next',
            action: tourDesktop.next
        }
    ]
});

tourDesktop.addStep({
    id: 'step7',
    title: 'Projects',
    text: 'If someone has already created a project, you can join it here using the project ID!',
    attachTo: {
        element: '#onboarding_step-7-desktop',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourDesktop.back
        },
        {
            text: 'Complete tour',
            action: tourDesktop.complete
        }
    ]
});

const tourMobile = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        exitOnEsc: true,
        cancelIcon: {
            enabled: true
        }
    }
});

tourMobile.addStep({
    id: 'step1',
    title: 'Hi, welcome to Appclusive!',
    text: 'In this quick onboarding tour we will show you the basics of the application. Keep in mind that you can always reactivate this tour in your settings! Click next to continue.',
    buttons: [
        {
            text: 'Next',
            action: tourMobile.next
        }
    ]
});

tourMobile.addStep({
    id: 'step2',
    title: 'Settings',
    text: 'You can use the settings page to change your account settings. Try adding a profile picture!',
    attachTo: {
        element: '#onboarding_step-2-mobile',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourMobile.back
        },
        {
            text: 'Next',
            action: tourMobile.next
        }
    ]
});

tourMobile.addStep({
    id: 'step3',
    title: 'Projects',
    text: 'You can create a new project here!',
    attachTo: {
        element: '#onboarding_step-6-desktop',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourMobile.back
        },
        {
            text: 'Next',
            action: tourMobile.next
        }
    ]
});

tourMobile.addStep({
    id: 'step4',
    title: 'Projects',
    text: 'If someone has already created a project, you can join it here using the project ID!',
    attachTo: {
        element: '#onboarding_step-7-desktop',
        on: 'bottom'
    },
    buttons: [
        {
            text: 'Previous',
            action: tourMobile.back
        },
        {
            text: 'Complete tour',
            action: tourMobile.complete
        }
    ]
});


if (localStorage.getItem('onboarding_tour') == null) {

    if (window.matchMedia("(min-width: 950px)").matches) {
        tourDesktop.start();
    } else {
        tourMobile.start();
    }

    localStorage.setItem('onboarding_tour', 'true');
}