import React from "react";
import { Card, Button } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();

  //handle to update cart
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
          marginBottom: 20,
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div>
          <Button className="item-button" onClick={() => handleAddToCart()}>
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
