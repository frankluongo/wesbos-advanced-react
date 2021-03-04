import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: unknown,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) throw new Error('You must be logged in to do this');
  // 2. Query the users cart
  const allItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: sesh.itemId },
      product: { id: productId },
    },
    resolveFields: 'id,quantity',
  });
  const [existingItem] = allItems;
  // 3. See if current item is in the cart
  if (existingItem) {
    // 3a. if it is, add 1
    return await context.lists.CartItem.updateOne({
      id: existingItem.id,
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    // 3b. if not, put it in the cart
    return await context.lists.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: sesh.itemId } }
      },
    });
  }
}
