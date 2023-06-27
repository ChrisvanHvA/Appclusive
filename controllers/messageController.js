class messageController {

    constructor() {
        this.messageClass = 'message--';

        this.messageObjects = {
            '1': {
                'message': "Successfully updated",
                'message_class': `${this.messageClass}success`
            },
            '2': {
                'message': "Successfully saved",
                'message_class': `${this.messageClass}success`
            },
            '3': {
                'message': "Successfully created",
                'message_class': `${this.messageClass}success`
            },
            '4': {
                'message': "Failed to save",
                'message_class': `${this.messageClass}error`
            },
            '5': {
                'message': "Failed to update",
                'message_class': `${this.messageClass}error`
            },
            '6': {
                'message': "Failed to load",
                'message_class': `${this.messageClass}error`
            },
            '7': {
                'message': "Something went wrong",
                'message_class': `${this.messageClass}error`
            },
        };
    }

    getMessage(key) {
        return this.messageObjects[key];
    }
}

export default messageController;
