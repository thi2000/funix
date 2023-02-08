import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Table, Button } from "reactstrap";
import "./transaction.css";
import { format } from "date-fns";
const Transaction = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/tran/${user.name}`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <Navbar />
      <Header type="list" />

      <Table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>price</th>
            <th>Payment Method</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr>
                <td scope="row">0{i + 1}</td>
                <td>{e.hotel}</td>
                <td>{`${e.rooms} ,`}</td>
                <td>{`${format(new Date(e.startDate), "MM/dd/yyyy")}- ${format(
                  new Date(e.dateEnd),
                  "MM/dd/yyyy"
                )}`}</td>
                <td>${e.price}</td>
                <td>{e.payment}</td>
                <td>
                  {e.status == "booked" ? (
                    <span className="booked">{e.status}</span>
                  ) : e.status == "checkin" ? (
                    <span className="checkin">{e.status}</span>
                  ) : (
                    <span className="checkout">{e.status}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Transaction;
