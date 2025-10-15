import React, { useState } from 'react'

const App = () => {
  const products = [
    { id: 1, name: 'Pen', price: 10, category: 'stationary' },
    { id: 2, name: 'Notebook', price: 50, category: 'stationary' },
    { id: 3, name: 'Pencil', price: 5, category: 'stationary' },
    { id: 4, name: 'Backpack', price: 500, category: 'bags' },
    { id: 5, name: 'Laptop Bag', price: 800, category: 'bags' },
    { id: 6, name: 'Laptop', price: 50000, category: 'electronics' },
    { id: 7, name: 'Mouse', price: 300, category: 'electronics' },
    { id: 8, name: 'Keyboard', price: 1200, category: 'electronics' },
    { id: 9, name: 'Eraser', price: 3, category: 'stationary' },
    { id: 10, name: 'Travel Bag', price: 1500, category: 'bags' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ padding: '20px', fontFamily: 'Chillax', textAlign: 'center' }}>
      <h1 style={{ fontSize: '82', fontWeight: '500'}}>Product Listing</h1>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: selectedCategory === 'all' ? '#007bff' : '#f0f0f0',
            color: selectedCategory === 'all' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          All
        </button>
        <button 
          onClick={() => setSelectedCategory('stationary')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: selectedCategory === 'stationary' ? '#007bff' : '#f0f0f0',
            color: selectedCategory === 'stationary' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Stationary
        </button>
        <button 
          onClick={() => setSelectedCategory('bags')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: selectedCategory === 'bags' ? '#007bff' : '#f0f0f0',
            color: selectedCategory === 'bags' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Bags
        </button>
        <button 
          onClick={() => setSelectedCategory('electronics')}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: selectedCategory === 'electronics' ? '#007bff' : '#f0f0f0',
            color: selectedCategory === 'electronics' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Electronics
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ color: '#666', margin: '0 0 10px 0' }}>{product.name}</h3>
            <p style={{ color: '#666', margin: '5px 0' }}>Category: {product.category}</p>
            <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '18px', margin: '10px 0 0 0' }}>
              ₹{product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
