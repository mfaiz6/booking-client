import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'

const Hotel = () => {

  //using useLocation hook to get hotelId to use it in url to fetch data from backend
  const location = useLocation()
  const id = location.pathname.split("/")[2]


  //using our custom hook to fetch data from api
  const { data, loading, error } = useFetch(`/hotels/find/${id}`)


  //Image slider
  //to get index of image
  const [slideNumber, setSlideNumber] = useState(0)

  //unhide/hide slider
  const [open, setOpen] = useState(false)

  //Image slide handler
  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  //slide arrow functionality
  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)

  }

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? ("loading") :
        (
          <div className="hotelContainer">

            {open && <div className="slider">

              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => handleMove("left")} className="arrow" />

              <div className="sliderWrapper">
                <img className="sliderImg" src={data.photos[slideNumber]} alt="" />
              </div>

              <FontAwesomeIcon icon={faCircleArrowRight} onClick={() => handleMove("right")} className="arrow" />

            </div>}

            <div className="hotelWrapper">

              <button className="bookNow">Reserve or Book Now!</button>

              <h1 className="hotelTitle">{data.name}</h1>

              <div className="hotelAddress">

                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>

              </div>

              <span className="hotelDistance">
                Excellent location - {data.distance}m from center
              </span>

              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
              </span>

              <div className="hotelImages">

                {data.photos?.map((photo, index) => (
                  <div className="hotelImgWrapper">
                    <img onClick={() => handleOpen(index)} className="hotelImg" src={photo} alt="" />
                  </div>
                ))}

              </div>

              <div className="hotelDetails">

                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>

                <div className="hotelDetailsPrice">

                  <h1>Perfect for a 9-night stay!</h1>

                  <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>

                  <h2><b>${data.cheapestPrice * 9}</b> (9 nights)</h2>

                  <button>Reserve or Book now!</button>

                </div>


              </div>

            </div>

            <MailList />

            <Footer />

          </div>)}

    </div>
  )
}

export default Hotel