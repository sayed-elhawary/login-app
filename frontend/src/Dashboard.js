import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL; // استخدام المتغير من .env

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!storedUsername || !token) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
      // جلب المنتجات من API
      axios.get(`${API_URL}/products`, {
        headers: { 'x-auth-token': token }
      })
      .then(res => setProducts(res.data.products))
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          logout();
        }
      });
    }
  }, [navigate, API_URL]);

  const mockProducts = [
    {
      _id: '1',
      name: 'Vintage Camera',
      price: 150.00,
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '2',
      name: 'Stylish Headphones',
      price: 85.50,
      imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '3',
      name: 'Leather Backpack',
      price: 120.00,
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '4',
      name: 'Modern Watch',
      price: 250.00,
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '5',
      name: 'Coffee Mug',
      price: 15.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    },
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background-color: #fafafa;
          font-family: 'Poppins', sans-serif;
        }
        .dashboard-container {
          max-width: 1100px;
          margin: 2rem auto;
          padding: 0 1rem 3rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 2px solid #eee;
          margin-bottom: 2rem;
        }
        .header h2 {
          color: #222;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 1.5px;
        }
        .welcome-msg {
          font-size: 1.1rem;
          color: #555;
          margin-top: 4px;
          font-weight: 500;
        }
        .logout-btn {
          background: linear-gradient(135deg, #ff5858, #f09819);
          border: none;
          color: white;
          padding: 10px 22px;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(240,152,25,0.6);
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        .logout-btn:hover {
          filter: brightness(1.1);
          box-shadow: 0 8px 16px rgba(255,88,88,0.7);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
          gap: 25px;
        }

        .product-card {
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        .product-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-info {
          padding: 15px 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .product-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .product-price {
          font-size: 1rem;
          font-weight: 700;
          color: #ff5858;
          letter-spacing: 0.6px;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="header">
          <div>
            <h2>My Cool Store</h2>
            <p className="welcome-msg">Hello, <strong>{username}</strong>! Enjoy shopping 🛒</p>
          </div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="products-grid">
          {displayProducts.map(product => (
            <div key={product._id} className="product-card" title={product.name}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

