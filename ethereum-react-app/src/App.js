import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import EthereumWallet from "./EthereumWallet";
import AddressFetcher from "./AddressFetcher";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav nav-pills justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fetch-address">
                  Fetch Address Balance
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<EthereumWallet />} />
            <Route path="/fetch-address" element={<AddressFetcher />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
