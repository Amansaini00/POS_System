import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Select, Input, message } from "antd";
import { useDispatch } from "react-redux";
import "../styles/Invoice.css";
import ReactToPrint from "react-to-print";

const BillsPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  //const dispatch = useDispatch();

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
    { title: "Sub-Total", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          ></EyeOutlined>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
        <Button type="primary" onClick={() => setPopModal(true)}>
          {" "}
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={billsData} bordered></Table>
      {popModal && (
        <Modal
          title="Invoice-Details"
          open={popModal}
          onCancel={() => {
            setPopModal(false);
          }}
          footer={false}
        >
          <div id="invoice-pos">
            <center id="top">
              {/* <div className="logo"></div> */}
              <div className="info">
                <h2>Guru Kirpa POS</h2>
                <p>
                  Contact: 9424875375 <br />
                  Near Sarwate Bus Stand Indore MadhyaPradesh
                </p>
              </div>
            </center>

            <div id="mid">
              <div className="mt-2">
                <p>
                  {" "}
                  Customer Name: <b>{selectedBill.customerName}</b>
                  <br />
                  Contact No: <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date: <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext"> {item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext"> {item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext"> {item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {" "}
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Tax</h2>
                      </td>
                      <td className="Rate">
                        <h2>&#8377;{selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="Rate">
                        <h2>&#8377;{selectedBill.totalAmount}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank You! For your order.</strong>
                  <br />
                  5% GST applicable on total amount. Please note that this is
                  non refundable Amount.For any further assistance please write
                  us on <b>gurukirpa@help.com</b>
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <ReactToPrint
                trigger={() => <Button type="primary">Print</Button>}
                content={() => document.getElementById("invoice-pos")}
              />
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
