class messageController {

    constructor(localSystemMessage = null) {
        this.localSystemMessage = localSystemMessage;

        this.messageClass = 'message--';
        this.messageObjects = {
            '1': {
                'message': "Successfully saved",
                'message_class': `${this.messageClass}success`
            },
            '2': {
                'message': "Something went wrong",
                'message_class': `${this.messageClass}error`
            }
        };
    }

    // creating custom message
    setMessage(message, message_class) {

        const customMessageObject = {
            'message': 'Custom message',
            'message_class': ''
        };

        customMessageObject.message = message;
        customMessageObject.message_class = message_class;

        return customMessageObject;
    }

    getMessage(key) {

        if (this.localSystemMessage) {
            return this.localSystemMessage;
        }

        return this.messageObjects[key];
    }
}

export default messageController;
