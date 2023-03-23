const { paginateResults } = require("../utils");

module.exports = {
    Query: {
        launches: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allLaunches = await dataSources.launchAPI.getAllLaunches()
            allLaunches.reverse();
            const launches = paginateResults({
                pageSize,
                after,
                results: allLaunches
            });
            return {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                hasMore: launches.length ? launches[launches.length - 1].cursor !==
                    allLaunches[allLaunches.length - 1].cursor : false
            };
        },
        launch: (_, { id }, { dataSources }) => {
            return dataSources.launchAPI.getLaunchById({ launchId: id });
        },
        me: (_, __, { dataSources }) => {
            return dataSources.userAPI.findOrCreateUser();
        },
        getListItems: (_, __, { dataSources }) => {
            return dataSources.todoListAPI.getListItems();
        },
        addOrUpdateListItem: (_, { listItem }, { dataSources }) => {
            return dataSources.todoListAPI.addOrUpdateListItem(listItem);
        },
        deleteTaskItem: (_, { taskID }, { dataSources }) => {
            return dataSources.todoListAPI.deleteTaskItem(taskID);
        }
    },
    Mission: {
        missionPatch: (mission, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL' ? mission.missionPatchSmall : mission.missionPatchLarge;
        }
    }
};