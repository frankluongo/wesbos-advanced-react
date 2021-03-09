/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

// Fake Highlighter
const gql = String.raw;

interface Arguments {
  token: string;
}

function reduceCart(tal: number, item: CartItemCreateInput) {
  return tal + item.quantity * item.product.price;
}

export default async function checkout(
  // eslint-disable-next-line no-unused-vars
  root: unknown,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure they're signed in
  const id = context?.session?.itemId;
  // 1a. If error, STOP
  if (!id) throw new Error('Sorry! You must be signed in');
  // 1b. If user, get their cart
  const user = await context.lists.User.findOne({
    where: { id },
    resolveFields: gql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          photo {
            id
            image {
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });
  // 2. Calculate Total Price
  const cartItems = user?.cart?.filter((item) => item?.product);
  const amount = cartItems.reduce(reduceCart, 0);
  // 3. Create Payment with Stripe Library
  try {
    const charge = await stripeConfig.paymentIntents.create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    });
    // 4. Convert Cart Items to Order Items
    const orderItems = cartItems.map((item) => ({
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
      photo: { connect: { id: item.product.photo.id } },
    }));
    // 5. Create and return the order
    const order = await context.lists.Order.createOne({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id } },
      },
    });
    // 6 Clean up any old cart items
    const cartItemIds = cartItems.map((item) => item.id);
    await context.lists.CartItem.deleteMany({
      ids: cartItemIds,
    });
    return order;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
