/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import getSrc from '@lib/getSrc';
import { SEARCH_PRODUCTS_QUERY } from '@lib/queries';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
  resetIdCounter();
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const findItemsChill = debounce(findItems, 350);

  const items = data?.searchTerms || [];

  function onInputValueChange({ inputValue }) {
    findItemsChill({
      variables: { searchTerm: inputValue },
    });
  }

  function onSelectedItemChange({ selectedItem }) {
    const { id } = selectedItem;
    router.push({
      pathname: `/product/${id}`,
    });
  }

  function itemToString(item) {
    return item?.name || '';
  }

  const {
    inputValue: searchTerm,
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange,
    onSelectedItemChange,
    itemToString,
  });

  const isEmpty = isOpen && !items.length && !loading;

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search For An Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, i) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={i === highlightedIndex}
            >
              <img src={getSrc(item)} alt={item.name} width="50" />
              {item.name}
            </DropDownItem>
          ))}
        {isEmpty && (
          <DropDownItem>Sorry, no items found for {searchTerm}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
