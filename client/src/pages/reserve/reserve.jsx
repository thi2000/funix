import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "./reserve.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Card } from "reactstrap";
import format from "date-fns/format";
const Reserve = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;
  const [data, setdata] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    identityCardNumber: "",
  });
  const [priceroom, setpriceroom] = useState(0);
  const [user, setuser] = useState([]);
  const [payment, setpayment] = useState("");

  const [count, setcount] = useState(0);
  const [roomid, setroomvalid] = useState([]);
  const [roomcheck, setroomcheck] = useState([]);
  const [holtelrooms, sethotelrooms] = useState([]);
  const [hotel, sethotel] = useState([]);
  const [rooms, setrooms] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotel${id}`)
      .then((res) => {
        sethotel([res.data]);

        sethotelrooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/rooms`)
      .then((res) => {
        setrooms(res.data);
        const roomvalid = rooms.filter((e) =>
          holtelrooms.find((id) => id == e._id)
        );
        const filterroom = roomvalid.filter(
          (room) =>
            new Date(room.dateEnd) >= state[0].endDate &&
            new Date(room.dateStart) <= state[0].startDate
        );
        setroomvalid(filterroom);
        const a = roomid.map((e, i) => e.roomNumbers);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/signup`)
      .then((res) => {
        const datauser = res.data;
        if (localStorage.getItem("user")) {
          const nameuser = JSON.parse(localStorage.getItem("user"));
          const uservalid = datauser.filter((e) => e.name == nameuser.name);

          const info = {
            fullname: uservalid[0].fullname,
            email: uservalid[0].email,
            phoneNumber: uservalid[0].phoneNumber,
            identityCardNumber: uservalid[0].identityCardNumber,
          };

          setdata(info);
        }
      })
      .catch((err) => {});
  }, [state, roomcheck, priceroom]);

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    // console.log("day la", newdata);
    setdata(newdata);
  };
  const paychane = (e) => {
    setpayment(e.target.value);
    console.log(payment);
  };

  const updateprice = (e) => {
    setpriceroom(e);
  };
  const check = (e) => {
    if (roomcheck.find((index) => index == e)) {
      setroomcheck(roomcheck.filter((index) => index != e));
      setcount(count - 1);
    } else {
      const a = roomcheck;

      a.push(e);
      setroomcheck(a);
      setcount(count + 1);
    }
  };
  const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    // console.log(ms1, ms2);
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
  };
  const day = get_day_of_time(state[0].startDate, state[0].endDate);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (localStorage.getItem("user")) {
      const a = JSON.parse(localStorage.getItem("user"));
      const start = format(state[0].startDate, "yyyy-MM-dd");
      const end = format(state[0].endDate, "yyyy-MM-dd");

      const transaction = {
        user: a.name,
        hotel: hotel[0].name,
        rooms: roomcheck,
        startDate: start,
        dateEnd: end,
        price: priceroom * count * (day + 1),
        payment: payment,
        status: "",
      };
      axios
        .post("http://localhost:5000/transactions", { transaction, data })
        .then((res) => {
          console.log("dc roi");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    navigate("/");
  };

  return (
    <div className="hotelContainer">
      {hotel.length != 0 && (
        <div className="hotelWrapper ">
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel[0].name}</h1>
              <p className="hotelDesc">{hotel[0].desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>asdasd</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
          <Form className="Formbook" onSubmit={handleSubmit}>
            <div className="reDetails ">
              <div>
                <h1> Date</h1>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </div>

              <div className="reinfo">
                <h1> Reserve info</h1>
                <div className="forminput">
                  <FormGroup className="input">
                    <Label for="fullname"> Your Fullname:</Label>
                    <Input
                      onChange={handle}
                      className="itemInput"
                      id="fullname"
                      name="fullname"
                      placeholder="fullname"
                      type="text"
                      required
                      value={data.fullname}
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    <Label for="email"> Your Email:</Label>
                    <Input
                      onChange={handle}
                      className="itemInput"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      required
                      value={data.email}
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    <Label for="phoneNumber">Your phone number:</Label>
                    <Input
                      // value={user.length > 0 ? user[0].phoneNumber : ""}
                      onChange={handle}
                      className="itemInput"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="phone"
                      type="number"
                      required
                      value={data.phoneNumber}
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    <Label for="card">Yours Identity CardNumber:</Label>
                    <Input
                      // value={user.length > 0 ? user[0].identityCardNumber : ""}
                      onChange={handle}
                      className="itemInput"
                      id="identityCardNumber"
                      name="identityCardNumber"
                      placeholder="Identity CardNumber"
                      type="number"
                      required
                      value={data.identityCardNumber}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>

            <div>
              <h1>select Room</h1>
              <div className="roomscontainer">
                {roomid.map((e) => {
                  return (
                    <div>
                      <FormGroup
                        className="rooms"
                        onClick={() => updateprice(e.price)}
                      >
                        <div className="roominfo">
                          <h3>{`${e.title}`}</h3>
                          <span>{e.desc}</span>

                          <span>max people:{e.maxPeople}</span>
                          <strong>${e.price}</strong>
                        </div>
                        <div className="checkcontainer">
                          {e.roomNumbers.map((i) => {
                            return (
                              <div className="check">
                                <div>
                                  <Label check>{i}</Label>
                                  <Input
                                    type="checkbox"
                                    onClick={() => check(i)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>
            {roomid.length > 0 && (
              <div>
                <strong>{`Total Bill :${
                  priceroom * count * (day + 1)
                }`}</strong>
                <div className="book">
                  <FormGroup>
                    <Input
                      onChange={paychane}
                      id="payment"
                      name="payment"
                      type="select"
                      className="select"
                      required
                    >
                      <option>chose payment</option>
                      <option>Cash</option>
                      <option>Credit Card</option>
                    </Input>
                  </FormGroup>
                  <button className="buttonBook ">Reserve Now!</button>
                </div>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};
export default Reserve;
