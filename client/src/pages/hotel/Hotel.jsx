import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Hotel = () => {
  let id = useParams().id;

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, sethotel] = useState([]);
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotel${id}`)
      .then((res) => {
        sethotel([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let b = [];
  if (hotel.length > 0) {
    for (let i = 0; i < hotel[0].photos.length; i++) {
      let a = { src: hotel[0].photos[i] };

      b.push(a);
    }
  }

  const photos = b;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? b.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === b.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {hotel.length != 0 && (
          <div className="hotelWrapper">
            <Link to="/reserve" state={{ id: id }}>
              <button className="bookNow">Reserve or Book Now!</button>
            </Link>
            <h1 className="hotelTitle">{hotel[0].title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel[0].address}</span>
            </div>
            <span className="hotelDistance">
              {`Excellent location - ${hotel[0].distance}m from center`}
            </span>
            <span className="hotelPriceHighlight">
              {`Book a stay over $${hotel[0].cheapestPrice} at this property and get a free airport taxi`}
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">{hotel[0].desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${hotel[0].cheapestPrice * 9}</b> (9 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
