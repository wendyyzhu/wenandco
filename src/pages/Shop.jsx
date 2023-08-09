import { useState, useEffect } from "react"
import * as itemsAPI from '../utilities/items-api'
import './Shop.css'
import ItemsList from "../components/ItemsList"

export default function Shop() {

    const [shopItems, setShopItems] = useState([])
    const [category, setCategory] = useState('All')
    
    useEffect(function() {
        itemsAPI.getAll()
            .then(res => {
                const items = res
                setShopItems(items.filter(item => {
                    if (category === 'All') {
                        return item
                    } else {
                        return category === item.category.name
                    }
                }))
            })
    },[category])

    function handleChange(evt) {
        setCategory(evt.target.value)
    }

    return (
        <div className="shop">
            <div className="category-list">
                <select onChange={handleChange}>
                    <option default value="All">All</option>
                    <option value="Simplicity Collection">Simplicity Collection</option>
                    <option value="Spring Collection">Spring Collection</option>
                </select>
            </div>
            <ItemsList shopItems={shopItems} />
        </div>
    )
}