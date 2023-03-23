export class CouchbaseQueries {

    public static GET_LIST_ITEMS = `SELECT summary, description, priority, status, taskID 
                                    FROM react_todo`;

}
