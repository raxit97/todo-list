const { RESTDataSource } = require('apollo-datasource-rest');

class TodoListAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:9000/todo-list/';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', 'JWT dsjkfbhsjdbfksdkjfbhsdfjhbsdf');
    }

    async getListItems() {
        const response = await this.get('items');
        return response;
    }

    async addOrUpdateListItem(listItem) {
        const response = await this.post('items/' + listItem.taskID, listItem);
        return response;
    }

    async deleteTaskItem(taskID) {
        const response = await this.delete('items/' + taskID);
        return response;
    }
}

module.exports = TodoListAPI;