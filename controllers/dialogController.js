class dialogController {

    // TODO: button hrefs

    constructor () {
        this.messages = {
            'finish_project_incomplete': {
                'title': 'Wait!',
                'slug': 'finish_project_incomplete',
                'image_url':'/images/illustration-wait.svg',
                'image_alt': 'Illustration of a person waiting',
                'message': '<p>Not all items are completed yet, if you continue now the application will not be <span class="text--highlight">100% accessible</span>, and will not comply with the legally required guidelines.</p>',
                'button_type': 'link',
                'button': 'I understand',
                'button_href': '/',
            },
            'category_finished': {
                'title': 'Good job!',
                'slug': 'category_finished',
                'image_url':'/images/illustration-celebrate.svg',
                'image_alt': 'Illustration of a person celebrating',
                'message': '<p>This project is now <span class="text--highlight">[[VALUE]] accessible</span>. <p>Keep it up!</p>',
                'button_type': 'link',
                'button': 'Next category',
                'button_href': '/',
            },
            'level': {
                'title': 'What does level mean?',
                'slug': 'level',
                'image_url': null,
                'image_alt': null,
                'message': '<p>Because it is an application for the <span class="text--highlight">government</span>, it is legally required to comply with the WCAG guidelines <span class="text--highlight">level AA</span>.</p><p><span class="text--highlight">WCAG guidelines</span> are guidelines that an application must meet to be accessible to everyone.</p> <p>The checklist is adjusted accordingly, if the checklists are checked off, the application meets this.</p> <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">More information about WCAG</a>',
                'button_type': 'form',
                'button': 'I understand',
                'button_href': null,
            }
        }
    }

    getMessage(key) {
        return this.messages[key];
    }

}

export default dialogController;