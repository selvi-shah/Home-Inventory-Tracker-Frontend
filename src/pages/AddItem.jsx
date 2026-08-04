import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { toast } from "react-toastify";

function AddItem({refresh, setRefresh}) {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem();
    }

    async function addItem() {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:3000/add-item", {name, quantity})
            setRefresh(prev => !prev);
            setName('')
            setQuantity('')
            toast.success("Item added successfully")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='inventory-card'>
      <form onSubmit={handleSubmit} className="inventory-form">
        
        {/* Input fields wrapped in a row */}
        <div className="input-group-row">
          <div className="input-field name-field">
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              name='text' 
              placeholder='Write item name'
            />
          </div>
          
          <div className="input-field qty-field">
            <input 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              type="number" 
              name="number" 
              id="number" 
              placeholder='Add quantity'
            />
          </div>
        </div>

        {/* Submit button spans the full width below */}
        <button className='btn' disabled={loading}>
          {loading ? "Adding...." : "Add Item"}
        </button>
      </form>
    </div>
  )
}

export default AddItem;
