import React, { useState, useEffect } from "react";
import Header from "./Components/portfolio/PortfolioHeader";
import About from "./Components/portfolio/PortfolioAbout";
import Card from "./Components/portfolio/PortfolioCard";
import Certifi from "./Components/portfolio/PortfolioCertificate";
import ContactPage from "./Components/portfolio/PortfolioContactPage";
import Footer from "./Components/portfolio/PortfolioFooter";
import Loader from "./Components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <About />
          <Card />
          <Certifi />
          <ContactPage />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
