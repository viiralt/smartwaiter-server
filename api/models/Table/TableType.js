const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = require('graphql');

const TableCodeType = require('../TableCode/TableCodeType');
const Table = require('../Table/Table');

const TableType = new GraphQLObjectType({
  name: 'Table',
  description: 'This represents each table within the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: table => table.id,
    },
    name: {
      type: GraphQLString,
      resolve: table => table.name,
    },
    positionX: {
      type: GraphQLFloat,
      resolve: table => table.positionX,
    },
    positionY: {
      type: GraphQLFloat,
      resolve: table => table.positionY,
    },
    width: {
      type: GraphQLFloat,
      resolve: table => table.width,
    },
    height: {
      type: GraphQLFloat,
      resolve: table => table.height,
    },
    activeCode: {
      type: GraphQLList(TableCodeType),
      resolve: async table => {
        return await table
          .getCodes({
            limit: 1,
            offset: 0,
            order: [['createdAt', 'DESC']],
            where: {
              status: 'PENDING_CONNECTION',
            },
          })
          .then(res => {
            return res;
          });
      },
    },
  }),
});

module.exports = TableType;
