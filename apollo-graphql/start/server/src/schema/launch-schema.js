const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        launches(pageSize: Int, after: String): LaunchConnection
        launch(id: ID!): Launch
        me: User
        addOrUpdateListItem(listItem: UpdateItemRequest): UpdateItemResponse
        getListItems: GetItemsResponse!
        deleteTaskItem(taskID: ID): UpdateItemResponse
    }
    type LaunchConnection {
        launches: [Launch]!
        cursor: String
        hasMore: Boolean!
    }
    type Launch {
        id: ID!
        site: String
        cursor: String
        mission: Mission
        rocket: Rocket
    }
    type Rocket {
        id: ID!
        name: String
        type: String
    }
    type User {
        id: ID!
        email: String!
        trips: [Launch]!
        token: String
    }
    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }
    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): User
    }
    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
    type GetItemsResponse {
        isSuccess: Boolean!
        ResponseBody: [ListItem!]!
    }
    type UpdateItemResponse {
        isSuccess: Boolean!
    }
    type ListItem {
        description: String
        priority: String!
        status: String!
        summary: String
        taskID: Int!
    }
    input UpdateItemRequest {
        description: String
        priority: String!
        status: String!
        summary: String
        taskID: Int!
    }
`;

module.exports = typeDefs;
