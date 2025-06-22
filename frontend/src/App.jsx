import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PopularItems from './components/PopularItems';
import Suggestion from './components/Suggestion';
import ProductDetail from './components/ProductDetail';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Suggestion />
                <PopularItems />
              </>
            } />
            <Route path="/product/:productId" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </div>
    </Router>
  );
}

export default App;
