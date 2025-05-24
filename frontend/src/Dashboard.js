import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username] = useState(() => localStorage.getItem('username') || 'Guest');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [checkoutMsg, setCheckoutMsg] = useState('');
  const navigate = useNavigate();

  const products = [
    {
      _id: '1',
      name: 'نايكي اير ماكس 270',
      description: 'حذاء رياضي مريح بتصميم حديث',
      price: 650,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '2',
      name: 'أديداس ألترابوست 22',
      description: 'حذاء رياضي مميز مع دعم فائق',
      price: 720,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '3',
      name: 'بوما RS-X³',
      description: 'حذاء رياضي بألوان جريئة',
      price: 480,
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/371570/02/sv01/fnd/PNA/fmt/png',
    },
    {
      _id: '4',
      name: 'ريبوك نانو X2',
      description: 'حذاء تدريب متكامل',
      price: 520,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-force-1-07-mens-shoes-KkLcGR.png',
    },
    {
      _id: '5',
      name: 'نايكي اير فورس 1',
      description: 'كلاسيكي بتصميم عصري',
      price: 600,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-force-1-07-mens-shoes-KkLcGR.png',
    },
    {
      _id: '6',
      name: 'أديداس ستان سميث',
      description: 'حذاء كلاسيكي بتصميم بسيط',
      price: 450,
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/371570/02/sv01/fnd/PNA/fmt/png',
    },
    {
      _id: '7',
      name: 'نيو بالانس 574',
      description: 'راحة ودعم فائق للقدم',
      price: 550,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '8',
      name: 'فيلا ديسروبتور 2',
      description: 'تصميم رياضي مميز',
      price: 500,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '9',
      name: 'كونفيرس تشاك تايلور',
      description: 'حذاء كلاسيكي للرجال والنساء',
      price: 400,
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/371570/02/sv01/fnd/PNA/fmt/png',
    },
    {
      _id: '10',
      name: 'سكيتشرز جوالكسي',
      description: 'راحة طوال اليوم',
      price: 420,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '11',
      name: 'أندر أرماور هافل راش',
      description: 'حذاء رياضي عالي الجودة',
      price: 680,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
    {
      _id: '12',
      name: 'سالومون XT-6',
      description: 'حذاء جري بتصميم عصري',
      price: 750,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    },
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutMsg('سلة التسوق فارغة');
      return;
    }

    setCheckoutMsg('تم إتمام الطلب بنجاح! 🎉');
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>متجر الكوتشيات الرياضية</h1>
          <p className="welcome">مرحباً <strong>{username}</strong>! تسوق بكل أريحية 😊</p>
        </div>
        <button className="logout-btn" onClick={logout}>تسجيل الخروج</button>
      </header>

      <div className="products-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-price">{product.price.toFixed(2)} جنيه</div>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                أضف إلى السلة
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>سلة التسوق</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">سلة التسوق فارغة</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price.toFixed(2)} جنيه</p>
                </div>
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    إزالة
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <h3>المجموع: {totalPrice.toFixed(2)} جنيه</h3>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            إتمام الشراء
          </button>
          {checkoutMsg && <p className="checkout-msg">{checkoutMsg}</p>}
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 30px auto;
          padding: 20px;
          font-family: 'Tajawal', sans-serif;
          background: #f5f5f5;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          direction: rtl;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2e7d32;
          color: white;
          padding: 20px 25px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 2.2rem;
          margin: 0;
        }

        .welcome {
          font-size: 1.1rem;
          margin-top: 5px;
          color: #e0e0e0;
        }

        .logout-btn {
          background: white;
          color: #2e7d32;
          border: none;
          padding: 10px 25px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background-color: #1b5e20;
          color: white;
        }

        .products-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .product-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: contain;
          background: #f9f9f9;
          padding: 10px;
        }

        .product-info {
          padding: 15px;
        }

        .product-title {
          font-size: 1.2rem;
          margin: 0 0 8px;
          color: #333;
        }

        .product-desc {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 12px;
        }

        .product-price {
          font-weight: bold;
          font-size: 1.3rem;
          color: #2e7d32;
          margin-bottom: 15px;
        }

        .add-to-cart {
          width: 100%;
          background-color: #388e3c;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-to-cart:hover {
          background-color: #2e7d32;
        }

        .cart-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .cart-section h2 {
          margin-bottom: 15px;
          color: #2e7d32;
          font-size: 1.8rem;
        }

        .empty-cart {
          text-align: center;
          font-size: 1.1rem;
          color: #777;
          padding: 20px;
        }

        .cart-items {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .cart-item img {
          width: 70px;
          height: 70px;
          object-fit: contain;
          border-radius: 8px;
          background: #f9f9f9;
        }

        .item-details {
          flex-grow: 1;
        }

        .item-details h4 {
          margin: 0 0 5px;
          font-size: 1.1rem;
        }

        .item-details p {
          margin: 0;
          font-weight: bold;
          color: #388e3c;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .item-controls input {
          width: 50px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
        }

        .remove-btn {
          background-color: #e53935;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .remove-btn:hover {
          background-color: #c62828;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .cart-summary h3 {
          font-size: 1.5rem;
          color: #2e7d32;
          margin: 0;
        }

        .checkout-btn {
          background-color: #1b5e20;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .checkout-btn:hover {
          background-color: #0d3e11;
        }

        .checkout-btn:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        .checkout-msg {
          text-align: center;
          font-size: 1.1rem;
          color: #388e3c;
          font-weight: bold;
          margin-top: 15px;
          padding: 10px;
          background-color: #e8f5e9;
          border-radius: 8px;
          animation: fadeIn 0.5s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
