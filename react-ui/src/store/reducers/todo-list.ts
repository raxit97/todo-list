import { ACTION_TYPES } from './../actions/action-types';

const initialState = {
    isTaskItemAdded: false
};

export const todoListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.TASK_ITEM_ADDED:
            return { ...state, isTaskItemAdded: true };
        case ACTION_TYPES.RESET_ADDED_STATUS:
            return { ...state, isTaskItemAdded: false };
        default:
            return state;
    }
};
