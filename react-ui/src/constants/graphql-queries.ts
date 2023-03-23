import { gql } from "apollo-boost";

export const GET_LIST_ITEMS = gql`
    query getListItems {
        getListItems{
            isSuccess
            ResponseBody {
                taskID
                summary
                description
                priority
                status 
            }
        }
    }
`;

export const ADD_OR_UPDATE_LIST_ITEM = gql`
    query addOrUpdateListItem($listItem: UpdateItemRequest) {
        addOrUpdateListItem(listItem: $listItem){
  	        isSuccess
        }
    }
`;

export const DELETE_TASK_ITEM = gql`
    query deleteTaskItem($taskID: ID) {
        deleteTaskItem(taskID: $taskID) {
            isSuccess
        }
    }
`;
