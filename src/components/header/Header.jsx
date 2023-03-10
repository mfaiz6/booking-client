import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCalendar, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {

    // react-date-range:
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    //destination handler
    const [destination, setDestination] = useState("")

    // date selector hide and show
    const [openDate, setOpenDate] = useState(false)



    //adult, children, room selection unhide/hide
    const [openOptions, setOpenOptions] = useState(false)

    //adult, children, room
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    //adult, children, room count handling: 
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    //Navigate using useNavigate hook to direct to any component/page
    const navigate = useNavigate()

    //
    const { user } = useContext(AuthContext)

    //Use context api to pass state
    const { dispatch } = useContext(SearchContext)

    //Search data handling
    const handleSearch = () => {

        //context api to send state
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })

        //navigate to hotels and pass data
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div className='header'>

            <div className="headerContainer">

                <div className="headerList">


                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>

                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>

                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>

                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Attractions</span>
                    </div>

                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Airport Taxis</span>
                    </div>

                </div>

                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? Its Genius.</h1>
                        <p className="headerDesc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A sint quaerat quam quasi asperiores consequatur voluptatum qui
                        </p>
                        {!user && <button className="headerBtn">Sign in/Register</button>}


                        {/* headerSearch */}
                        <div className="headerSearch">

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text" placeholder='Where are you going?' className='headerSearchInput' onChange={e => setDestination(e.target.value)} />
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                                {openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="date" minDate={new Date()} />}
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>

                                {openOptions && <div className="options">

                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>

                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>

                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>


                                </div>}

                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>

                        </div>
                    </>
                }



            </div>

        </div>
    )
}

export default Header