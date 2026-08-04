import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { useEffect } from 'react';

function ItemList() {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems = items.filter((item) => {

    if (selectedCategory === "all") {
        return true;
    }

    if (selectedCategory === "in-stock") {
        return item.quantity > 0;
    }

    if (selectedCategory === "out-of-stock") {
        return item.quantity === 0;
    }

});


    useEffect(() => {
        listItems()
    },[])

    async function listItems() {
        setLoading(true)

        try {
            const response = await axios.get("http://localhost:3000/items")
            console.log(response.data.allitems)
            setItems(response.data.allitems)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    

  return (
    <table>
    <thead>
        <tr>
            <th>
                <div className="status-header-container">
                    <span>Status</span>
                    <select value={selectedCategory} onChange={handleDropdownChange} className="status-dropdown">
                        <option value="all">All</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                </div>
            </th>
        </tr>
    </thead>

    <tbody>
        {filteredItems.map((item) => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td className={item.quantity > 0 ? "text-in-stock" : "text-out-of-stock"}>
                {item.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
            </tr>
        ))}

    </tbody>
</table>
       
  )
}

export default ItemList;
