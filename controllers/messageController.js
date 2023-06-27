class messageController {

    constructor() {
        this.messages = {
            '1': "Success",
            '2': "Error message here"
        };
    }

    getMessage(key) {
        return this.messages[key];
    }
}

export default messageController;
