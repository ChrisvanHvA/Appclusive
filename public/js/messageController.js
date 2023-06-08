class messageController {

    constructor () {
        this.messages = {
            'error': 'Oops! Something went wrong',
            'no_name': 'Toch liever anoniem blijven? Klik op de checkbox onderaan het formulier',
            'no_email': 'Um hehe... We hebben toch echt je e-mail nodig',
            'invalid_email': 'Helaas pindakaas! Je e-mail komt niet voor in onze database',
        }
    }

    getMessage(key) {
        return this.messages[key];
    }

}

export default messageController;