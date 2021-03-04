import { list } from '@keystone-next/keystone/schema';
import { integer, relationship } from '@keystone-next/fields';

export const CartItem = list({
  // TODO: Custom label
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
