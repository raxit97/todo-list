import { Get, Body, Post, Delete, Param, JsonController, Req } from 'routing-controllers';
import { Service } from 'typedi';
import { CouchbaseUtility } from '../utilities/couchbase-utility';
import { CouchbaseQueries } from '../constants/couchbase-queries';
import * as express from 'express';

@Service()
@JsonController('/todo-list')
export class TODOController {

    couchbaseUtility: CouchbaseUtility

    constructor() {
        this.couchbaseUtility = CouchbaseUtility.getInstance();
    }

    @Get('/items')
    async getItems() {
        try {
            let results = await this.couchbaseUtility.getResultsBasedOnQuery(CouchbaseQueries.GET_LIST_ITEMS, []);
            return {
                isSuccess: true,
                ResponseBody: results
            }
        } catch (error) {
            return { isSuccess: false };
        }
    }

    @Post('/items/:taskID')
    async addOrUpdateItem(@Param('taskID') taskID: string, @Req() req: express.Request, @Body() body: any) {
        try {
            await this.couchbaseUtility.upsert(taskID, body);
            return { isSuccess: true };
        } catch (error) {
            return { isSuccess: false };
        }
    }

    @Delete('/items/:taskID')
    async deleteItem(@Param('taskID') taskID: string) {
        try {
            await this.couchbaseUtility.delete(taskID);
            return { isSuccess: true };
        } catch (error) {
            return { isSuccess: false };
        }
    }

}
