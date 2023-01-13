import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({ item }) => {
    return (
        <div className='searchItem'>

            <img className="siImg" src={item.photos[0]} alt="" />

            <div className="siDesc">

                <h1 className="siTitle">{item.name}</h1>

                <span className="siDistance">{item.distance}m from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">{item.desc}</span>
                <span className="siFeatures">Entire Studio - 1 bathroom -  21m 1 full bed</span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">you can cancel later, so lock in this great price today!</span>

            </div>


            <div className="siDetails">

                {/* {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>} */}

                <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>

                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes & fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className='siCheckButton'>See availability</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default SearchItem