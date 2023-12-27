import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import axios from "axios";

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const getAllBills = async () => {
    try {
      /*dispatch({
        type: "SHOW_LOADING",
      });*/
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      /* dispatch({ type: "HIDE_LOADING" });*/
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //useEfffect
  useEffect(() => {
    getAllBills();
  }, []);

  //table data
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact Number", dataIndex: "customerNumber" },
  ];
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={billsData} bordered></Table>
    </DefaultLayout>
  );
};

export default CustomerPage;
