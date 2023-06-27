import messageController from "../controllers/messageController.js";
const MessageController = new messageController();

const getSystemMessage = async (req, res, next) => {

    const message = MessageController.getMessage(req.query.m) ?? null;
    res.locals.system_message = message;

    next();
};

export { getSystemMessage };
