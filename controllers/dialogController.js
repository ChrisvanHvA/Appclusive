class dialogController {

    constructor () {
        this.messages = {
            'finish_project_incomplete': {
                'title': 'Wait!',
                'slug': 'finish_project_incomplete',
                'image_url':'/images/illustration-wait.svg',
                'image_alt': 'Illustration of a person waiting',
                'message': '<p>Not all items are completed yet, if you continue now the application will not be <span class="text--highlight">100% completed</span>, and will not comply with the legally required guidelines.</p>',
                'button_type': 'link',
                'button': 'I understand',
                'button_href': '/',
            },
            'category_finished': {
                'title': 'Good job!',
                'slug': 'category_finished',
                'image_url':'/images/illustration-celebrate.svg',
                'image_alt': 'Illustration of a person celebrating',
                'message': '<p>This project is now <span class="text--highlight">more completed</span>. <p>Keep it up!</p>',
                'button_type': 'link',
                'button': 'Back to categories',
                'button_href': '?category=returntocategories',
            },
            'level': {
                'title': 'What does level mean?',
                'slug': 'level',
                'image_url': null,
                'image_alt': null,
                'message': '<p>Applications made for the <span class="text--highlight">government</span> are legally required to comply with the WCAG guidelines <span class="text--highlight">level AA</span>.</p><p><span class="text--highlight">WCAG guidelines</span> are guidelines that an application must meet to be accessible to everyone.</p> <p>The checklist is adjusted accordingly, if the checklists are checked off, the application meets this.</p> <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank"><i class="icon fa-solid fa-up-right-from-square"></i>More information about WCAG</a>',
                'button_type': 'form',
                'button': 'I understand',
                'button_href': null,
            },
            'assign_users': {
                'title': 'Assign users',
                'slug': 'assign_users',
                'image_url': null,
                'image_alt': null,
                'message': '<p>Select one or multiple users to assign</p>',
                'button_type': 'assign',
                'button': 'Assign users',
                'button_href': null,
            },
            'project_finished': {
                'title': 'Project completed!',
                'slug': 'project_finished',
                'image_url':'/images/illustration-celebrate.svg',
                'image_alt': 'Illustration of a person celebrating',
                'message': '<p>You completed all categories!</p>',
                'button_type': 'link',
                'button': 'Return to dashboard',
                'button_href': '/',
            }
        }
    }

    getMessage(key) {
        return this.messages[key];
    }

}

export default dialogController;