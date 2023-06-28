class messageController {

    constructor(localSystemMessage = null) {
        this.localSystemMessage = localSystemMessage;

        this.messageClass = 'message--';
        this.messageObjects = {
            '1': {
                'message': "Successfully saved",
                'message_class': `${this.messageClass}success`,
                'type': ['success','saved']
            },
            '2': {
                'message': "Something went wrong",
                'message_class': `${this.messageClass}error`,
                'type': ['generic_fail']
            },
            '3': {
                'message': "Unable to find user",
                'message_class': `${this.messageClass}error`,
                'type': ['unknown_user']
            },
            '4': {
                'message': "The provided passwords do not match",
                'message_class': `${this.messageClass}error`,
                'type': ['password_match', 'fail']
            },
            '5': {
                'message': "Failed to update user",
                'message_class': `${this.messageClass}error`,
                'type': ['user_update', 'fail']
            },
            '6': {
                'message': "No file uploaded",
                'message_class': `${this.messageClass}error`,
                'type': ['file_upload', 'fail']
            },
            '7': {
                'message': "Failed to update profile picture",
                'message_class': `${this.messageClass}error`,
                'type': ['file_save', 'fail']
            },
            '8': {
                'message': "Failed to update project",
                'message_class': `${this.messageClass}error`,
                'type': ['project_update', 'fail']
            },
            '9': {
                'message': "Failed to delete project",
                'message_class': `${this.messageClass}error`,
                'type': ['project_delete', 'fail']
            },
            '10': {
                'message': "Failed to create project",
                'message_class': `${this.messageClass}error`,
                'type': ['project_create', 'fail']
            },
            '11': {
                'message': "We could not find the project you are looking for...",
                'message_class': `${this.messageClass}error`,
                'type': ['unknown_project']
            },
            '12': {
                'message': "Project joined!",
                'message_class': `${this.messageClass}success`,
                'type': ['joined']
            },
            '13': {
                'message': "Successfully assigned task",
                'message_class': `${this.messageClass}success`,
                'type': ['assigned_task', 'saved']
            },
            '14': {
                'message': "Failed to assign task",
                'message_class': `${this.messageClass}error`,
                'type': ['assigned_task', 'fail']
            },
            '15': {
                'message': "Project deleted",
                'message_class': `${this.messageClass}success`,
                'type': ['assigned_task', 'success']
            },
            '9': {
                'message': "Project deleted",
                'message_class': `${this.messageClass}success`,
                'type': ['project_delete', 'success']
            },
        };
    }

    getMessageKeyByType(...searchStrings) {

        let messageKey = 2;

        const keys = Object.keys(this.messageObjects);

        for (let i = 1; i <= keys.length; i++) {
            const key = keys[i];
            const messageObj = this.messageObjects[key];

            const hasAllStrings = searchStrings.every((searchString) => {
                return messageObj.type.includes(searchString);
            });

            if (hasAllStrings) {
                messageKey = key;
                break;
            }
        }

        return messageKey;
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
