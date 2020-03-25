import React from 'react';
import Header from './layout/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './Makeup.css'
import Home from './pages/Home'
import ProductTemplate from './product/ProductTemplate'
import CategoryTemplate from './pages/CategoryTemplate';

class App extends React.Component{
  render(){
    return(
      <div>
          <Router>
            <Header/>
            <Route path={"/"} exact component={Home}/>
            <Switch>
              <Route path="/:category" render={(props)=><CategoryTemplate {...props}/>}/>
              <Route path="/product/:id" render={(props)=><ProductTemplate {...props}/>}/>
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App;
