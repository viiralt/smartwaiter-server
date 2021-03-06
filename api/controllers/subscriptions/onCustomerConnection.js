const { GraphQLInt, GraphQLString } = require('graphql');
const { pubsub } = require('../../subscriptions');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');

const { ON_CUSTOMER_CONNECTION } = require('./events');

module.exports = {
  type: NotificationType,
  args: {
    orderId: {
      name: 'orderId',
      type: GraphQLInt,
    },
    connectionId: {
      name: 'connectionId',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    userName: {
      name: 'userName',
      type: GraphQLInt,
    },
    productOrderId: {
      name: 'productOrderId',
      type: GraphQLInt,
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLInt,
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('onCustomerConnection'),
    (payload, args) => {
      if (args.restaurantId) {
        if (payload.onCustomerConnection.restaurantId == args.restaurantId) {
          return true;
        }
      }
      return false;
    }
  ),
};
