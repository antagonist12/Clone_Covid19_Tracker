import React from 'react';
import './App.css';
// // Router DOM
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// // Import Components
// import Navigations from './components/Navigations';
// // Views Pages
import Home from './views/Home';
// import About from './views/About';
// import Product from './views/Product';

function App() {
  return (
      <div className="App">
        <Home />
    {/* <Router>
        <Navigations />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/product" component={Product} />
        </Switch>
    </Router> */}
      </div>
  );
}

export default App;
