import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Remove the colon from product ID if present
    const cleanId = productId.replace(/:/g, '');
    
    // Fetch product data from API
    fetch(`http://localhost:5000/api/products/${cleanId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        console.log('Product data:', data);
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const nextImage = () => {
    if (product.gallery && product.gallery.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.gallery.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product.gallery && product.gallery.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.gallery.length - 1 : prevIndex - 1
      );
    }
  };

  // Helper function to fix image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return '/placeholder-image.jpg'; // Use placeholder from public folder
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        Category / {product.category} / {product.subcategory} / {product.type}
      </div>
      
      <div className="product-content">
        <div className="product-images">
          {product.gallery && product.gallery.length > 1 && (
            <button className="arrow left" onClick={prevImage}>&lt;</button>
          )}
          
          <img 
            src={getImageUrl(product.gallery ? product.gallery[currentImageIndex] : product.image)} 
            alt={product.name}
            className="main-image"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              // Try a public image from your frontend assets
              e.target.src = '/assets/images/ralph_product.jpg';
            }}
          />
          
          {product.gallery && product.gallery.length > 1 && (
            <button className="arrow right" onClick={nextImage}>&gt;</button>
          )}
        </div>
        
        <div className="product-info">
          <div className="brand">{product.brand}</div>
          <h1 className="product-name">{product.name}</h1>
          <div className="price">{product.price.toLocaleString()} VND</div>
          
          <div className="size-selection">
            <p>Select size</p>
            <div className="size-options">
              {product.sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <button className="inbox-btn">INBOX US</button>
          
          <div className="details">
            <h3>Details</h3>
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;