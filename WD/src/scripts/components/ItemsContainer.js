import React, { useCallback } from "react";
import { useFavoriteItems, useItems } from "../context/item-context/ItemContext";
import ItemCard from "./ItemCard";

const renderItem = (item, onClickItem) => {
  return (
      <ItemCard
        key={item.key}
        item={item}
        onClick={onClickItem}
      />
  )
}

const ItemsContainer = ({ customItems = [], renderFavoriteItems = false, onClickItem }) => {
  const items = useItems()
  const favItems = useFavoriteItems()
  if (customItems.length) {
    return customItems.map((item) => renderItem(item, onClickItem))
  }
  if (renderFavoriteItems) {
    return favItems.map((item) => renderItem(item, onClickItem))
  }
  return items.map((item) => renderItem(item, onClickItem))
}

export default ItemsContainer