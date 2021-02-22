import gql from 'graphql-tag';
import { ALL_PRODUCTS_COUNT } from './queries';

export default function paginationField() {
  return {
    keyArgs: false, // Tell Apollo we got this
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read # of items on page from cache
      const data = cache.readQuery({ query: ALL_PRODUCTS_COUNT });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const isLastPage = page === pages;
      const items = existing.slice(skip, skip + first).filter((item) => item);
      const lessThanFirst = items.length !== first;

      if (items.length && lessThanFirst && isLastPage) return items;
      if (lessThanFirst) return false;
      if (items.length) return items;
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
