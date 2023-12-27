import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, message, Form, Item, Select, Input } from "antd";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const handlesubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        subTotal,
        cartItems,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("/api/bills/add-bills", newObject);
      message.success("bill generated successfully");
      navigate("/bills");
    } catch (error) {
      message.error("something Went Wrong");
      console.log(error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className=" mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className=" mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);
  return (
    <DefaultLayout>
      <h1>Hello! cart page</h1>
      <Table columns={columns} dataSource={cartItems} bordered></Table>
      <div className="d-flex  flex-column align-items-end">
        <hr />
        <h3>
          {" "}
          Subtotal :&#8377; <b>{subTotal}</b>/-
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          {" "}
          Generate Invoice
        </Button>
      </div>
      <Modal
        title="Generate Invoice"
        open={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handlesubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Contact Number">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">
                Debit Card / Credit Card
              </Select.Option>
              <Select.Option value="upi">Upi</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Subtotal : &#8377; <b> {subTotal}</b>
            </h5>
            <h4>
              Tax<b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL:&#8377;
              {Number(subTotal) +
                Number(((subTotal / 100) * 10).toFixed(2))}{" "}
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              {" "}
              SAVE
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
