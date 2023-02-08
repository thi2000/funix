import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";
import { useEffect } from "react";
import { az, ro } from "date-fns/locale";
import { Link } from "react-router-dom";
const List = () => {
  const location = useLocation(); // truyen du lieu tu components nay qua component khac
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options.room);
  const [hotel, sethotel] = useState([]);
  const [room, setroom] = useState([]);
  const [search, setsearch] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        // console.log(res.data);
        sethotel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/rooms")
      .then((res) => {
        console.log(res.data);
        setroom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const filterdata = (name, room) => {
    const data = hotel.filter(
      (e) =>
        e.city.toLowerCase() == name.toLowerCase() &&
        e.rooms.length >= Number(room)
    );
    return data;
  };

  const result = (time) => {
    const c = new Date(room.dateEnd);
    console.log(c);
    console.log(time[0].endDate <= c);

    const hotel = filterdata(destination, options);
    const roomvalid = room.filter(
      (room) =>
        new Date(room.dateEnd) >= time[0].endDate &&
        new Date(room.dateStart) <= time[0].startDate
    );
    const roomvalidid = roomvalid.map((e, i) => e._id);
    console.log(hotel);
    const a = hotel.filter((e) =>
      roomvalidid.some((index) => e.rooms.includes(index))
    );

    setsearch(a);
  };

  return (
    <div>
      <Navbar />

      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) => {
                      setOptions(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <button onClick={(e) => result(date)}>Search</button>
          </div>

          <div className="listResult">
            {search.map((e) => {
              return (
                <div>
                  <Link to={`./${e._id}`} className="imghotel">
                    <SearchItem data={e} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
