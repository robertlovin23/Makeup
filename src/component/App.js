import React from 'react';
import Header from './layout/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './Makeup.css'
import Footer from '../component/layout/Footer'
import Home from './pages/Home'
import ProductTemplate from './product/ProductTemplate'
import CategoryTemplate from './pages/CategoryTemplate';

class App extends React.Component{
  state = {
    links: [
      {"name":'lipstick', "linkName": "Lipstick"},
      {"name":'mascara', "linkName": "Mascara"},
      {"name":'blush', "linkName": "Blush"},
      {"name":'bronzer', "linkName": "Bronzer"},
      {"name":'eyebrow', "linkName": "Eyebrows"},
      {"name":'eyeliner', "linkName": "Eyeliner"},
      {"name":'eyeshadow', "linkName": "Eyeshadow"},
      {"name":'foundation', "linkName": "Foundation"},
      {"name":'lip_liner', "linkName": "Lip Liner"},
      {"name":'nail_polish', "linkName": "Nail Polish"},
  ]

  }
  render(){
    const links = this.state.links
    console.log(links)

    return(
      <div>
          <Router>
            <Header links={links}/>
            <Route path={"/"} exact component={Home}/>
            <Switch>
              <Route path="/:category" exact render={(props)=><CategoryTemplate {...props} links={links}/>}/>
              <Route path="/products/:id" render={(props)=><ProductTemplate {...props}/>}/>
            </Switch>
            <Footer/>
          </Router>
      </div>
    )
  }
}

export default App;
