// controllers/ChatController.js
const Chat = require('../models/Chat');
const GlobalHelpers = require('../helpers/GlobalHelpers');
const DateTimeHelper = require('../helpers/DateTimeHelper');


class ChatController {

    async createUser(req, res) {
        let response = {};
        try {
            const post_data = req.body;
            if (await GlobalHelpers.emptyValidator(post_data.name)) {
                response = await GlobalHelpers.responseMessage("api/add_user", "Name is required.", [], {}, 500);
                return res.status(500).json(response);
            }
            if (await GlobalHelpers.emptyValidator(post_data.email)) {
                response = await GlobalHelpers.responseMessage("api/add_user", "Email is required.", [], {}, 500);
                return res.status(500).json(response);
            }

            let insert_user = {
                name: post_data.name,
                email: post_data.email,
                status: 1,
                created_at: await DateTimeHelper.formatDate("", ""),
                updated_at: await DateTimeHelper.formatDate("", "")
            };
            await Chat.createUser(insert_user);

            response = await GlobalHelpers.responseMessage("api/add_user", "User added successfully.", [], {}, 200);
            return res.status(201).json(response);
        } catch (error) {
            response = await GlobalHelpers.responseMessage("api/add_user", "Please check the error.", error.message, {}, 500);
            return res.status(500).json(response);
        }
    }

}

module.exports = new ChatController();