import { Link } from "react-router-dom"
import './Collections.css'

export default function Collections() {
    return (
        <div className="collections-wrapper">
            <div className="collections">
                <Link to="shop"><img src="spring-collection.JPG" alt="" /></Link>
                <article>
                    <h2>Spring Collection</h2>
                    <h4 className="collection-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                    <Link to="shop">SHOP NOW</Link>
                </article>
            </div>
            <div className="collections" id="collection-large">
                <article>
                    <h2>Simplicity Collection</h2>
                    <h4 className="collection-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h4>
                    <Link to="shop">SHOP NOW</Link>
                </article>
                <Link to="shop"><img src="simplicity-collection.JPG" alt="" /></Link>
            </div>
            <div className="collections" id="collection-mob">
                <Link to="shop"><img src="simplicity-collection.JPG" alt="" /></Link>
                <article>
                    <h2>Simplicity Collection</h2>
                    <h4 className="collection-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h4>
                    <Link to="shop">SHOP NOW</Link>
                </article>
            </div>
        </div>
    )
}