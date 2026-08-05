import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { useEffect } from 'react';
import { toast } from "react-toastify";

function ItemList({refresh}) {

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
    },[refresh])

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

    async function deleteItem(id) {

        try {
            await axios.delete(`http://localhost:3000/items/${id}`)
            toast.success("Item deleted successfully!");
            listItems()
            
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQuantity(id, quantity) {
        try {
            await axios.patch(`http://localhost:3000/items/${id}`, {quantity})
            listItems()
        } catch (error) {
            console.log(error)
        }
    }

    

  return (
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>
                        <div className="excel-text-filter">
                            <span className="filter-label">Status <span className="arrow-icon">▼</span></span>
                                <select 
                                value={selectedCategory} 
                                onChange={handleDropdownChange} 
                                className="hidden-filter-select"
                                >
                                <option value="all">All</option>
                                <option value="in-stock">In Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {filteredItems.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
  <div className="quantity-picker">
    <button 
      className="quantity-btn"
      onClick={() => {
        if (item.quantity > 0) {
          updateQuantity(item._id, item.quantity - 1);
        }
      }}
      disabled={item.quantity <= 0} /* Disables button visually & functionally */
    >
      -
    </button>
    
    <span className="quantity-value">{item.quantity}</span>
    
    <button 
      className="quantity-btn"
      onClick={() => updateQuantity(item._id, item.quantity + 1)}
    >
      +
    </button>
  </div>
</td>

                        <td className={item.quantity > 0 ? "text-in-stock" : "text-out-of-stock"}>
                        {item.quantity > 0 ? "In Stock" : "Out of Stock"}</td>

                        <td>
                            <button className="btn-delete-icon" onClick={() => deleteItem(item._id)} title="Delete Item">
                                <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-svg">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

export default ItemList;
