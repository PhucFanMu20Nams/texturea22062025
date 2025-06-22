const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Completely disable helmet's CORS restrictions
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "*"],
    imgSrc: ["'self'", "*", "data:"]
  }
}));

// Set crossOriginResourcePolicy to cross-origin
app.use(helmet.crossOriginResourcePolicy({ 
  policy: "cross-origin" 
}));

app.use(compression());

// Allow requests from any origin
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Simplified static file serving with proper CORS headers
app.use('/images', express.static(path.join(__dirname, 'images'), {
  setHeaders: function(res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    // Additional header to help with CORS issues
    res.set('Timing-Allow-Origin', '*');
  }
}));

// API routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});