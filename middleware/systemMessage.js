import messageController from "../controllers/messageController.js";

const getSystemMessage = async (req, res, next) => {
    const MessageController = new messageController(res.locals.system_message);
    const messageKey = req.query.m ?? null;

    // check if system message has to be shown
    if (messageKey) {
        res.locals.system_message = MessageController.getMessage(messageKey);

    // reset locals
    } else {
        res.locals.system_message = null;
    }

    next();
};

export { getSystemMessage };