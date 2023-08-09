import './ItemsList.css'
import { Link } from 'react-router-dom'

export default function ItemsList({ shopItems}) {
    return (
        <div className="items-list">
            {shopItems.map(item => (
                <section key={item._id}>
                    <Link to={item._id}><img src={item.image[0]} alt="" /></Link>
                    <div>
                        <div className='product-details'>
                            <h4>{item.name}</h4>
                            <h5>${item.price}</h5>
                        </div>
                    </div>
                </section>               
            ))}
        </div>
    ) 
}