import React from 'react';
import { useFavoriteItems, useItems } from '../context/item-context/ItemContext';
import ItemCard from './ItemCard';

const renderItem = (item, onClickItem) => {
  return (
    <ItemCard
      key={item.key}
      item={item}
      onClick={onClickItem}
    />
  );
};

const ItemsContainer = ({ customItems = [], renderFavoriteItems = false, renderMyItems = false, onClickItem }) => {
  const items = useItems();
  const favItems = useFavoriteItems();
  if (renderFavoriteItems) {
    return favItems.map((item) => renderItem(item, onClickItem));
  }
  if (renderMyItems) {
    return items.map((item) => renderItem(item, onClickItem));
  }
  return customItems.map((item) => renderItem(item, onClickItem));
};

export default ItemsContainer;
