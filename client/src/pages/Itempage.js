import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Select, Input, message } from "antd";
import { useDispatch } from "react-redux";

const Itempage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  //const dispatch = useDispatch();

  const getAllItems = async () => {
    try {
      /*dispatch({
        type: "SHOW_LOADING",
      });*/
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      /* dispatch({ type: "HIDE_LOADING" });*/
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //useEfffect
  useEffect(() => {
    getAllItems();
  }, []);

  //handle delete
  const handleDelete = async (record) => {
    try {
      /*dispatch({
      type: "SHOW_LOADING",
    });*/
      await axios.post("/api/items/delete-item", { itemId: record._id });
      /* dispatch({ type: "HIDE_LOADING" });*/
      message.success("Item Deleted Successfully");
      getAllItems();
      setPopModal(false);
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };
  //table data
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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  //handle submit
  const handlesubmit = async (value) => {
    if (editItem === null) {
      try {
        /*dispatch({
        type: "SHOW_LOADING",
      });*/
        const res = await axios.post("/api/items/add-item", value);
        /* dispatch({ type: "HIDE_LOADING" });*/
        message.success("Item Added Successfully");
        getAllItems();
        setPopModal(false);
      } catch (error) {
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        /*dispatch({
          type: "SHOW_LOADING",
        });*/
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        /* dispatch({ type: "HIDE_LOADING" });*/
        message.success("Item Updated Successfully");
        getAllItems();
        setPopModal(false);
      } catch (error) {
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Items</h1>
        <Button type="primary" onClick={() => setPopModal(true)}>
          {" "}
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered></Table>
      {popModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={popModal}
          onCancel={() => {
            setEditItem(null);
            setPopModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handlesubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image-URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="chienese">Chinese</Select.Option>
                <Select.Option value="punjabi">Punjabi</Select.Option>
                <Select.Option value="starter">Starter</Select.Option>
                <Select.Option value="rice">rice</Select.Option>
                <Select.Option value="main-Course">Main-course</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                {" "}
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Itempage;
