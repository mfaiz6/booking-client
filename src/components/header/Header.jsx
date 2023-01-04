import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCar, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
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

                <h1 className="headerTitle">A lifetime of discounts? Its Genius.</h1>
                <p className="headerDesc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A sint quaerat quam quasi asperiores consequatur voluptatum qui 
                </p>
                <button className="headerBtn">Sign in/Register</button>

            </div>

        </div>
    )
}

export default Header