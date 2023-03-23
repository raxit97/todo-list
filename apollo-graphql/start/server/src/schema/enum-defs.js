const { gql } = require('apollo-server');

const enumDefs = gql`
    enum PatchSize {
        SMALL
        LARGE
    }
`;

module.exports = enumDefs;
