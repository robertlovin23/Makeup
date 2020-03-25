import React from 'react';
import makeup from '../../api/makeup'
import ListMakeup from '../list/ListMakeup'
import Searchbar from '../Searchbar'
import LipstickImage from '../../img/lipstick.jpg'
import '../Makeup.css'
import { Grid,Paper, FormControl, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'

class CategoryTemplate extends React.Component{
  constructor(){
    super()
      this.state = {
        data: [],
        currentPage: 1,
        itemsPerPage: 30,
        selectedItem: null,
        active: ""
    }
  }

  handlePageCount = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      active: event.target.value
    })
  }

  handleRequest = async (query) => {
    const props = this.props

    const link = props.match.url.substring(1)
    console.log(link)
    const response =  await makeup.get(`/products.json?product_type=${link}`, {
      params: {
        brand: query
      }
    })

    this.setState({
      data: response.data
    })
  }

  componentDidMount = () => {
    this.handleRequest()
  }

  // componentDidUpdate = (prevState,prevProps) => {
  //   if(prevState.active !== this.state.active){
  //     console.log("active value has changed")
  //   }
  // }

  handleFilterHighPrice = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(b.price < a.price) return -1;
      if(a.price > b.price) return 1;
    });
    this.setState({
      data: items,
      active: "High Price"
    })
    console.log(this.state.active)
  }

  handleFilterLowPrice = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(a.price < b.price) return -1;
      if(b.price > a.price) return 1;
    });
    this.setState({
      data: items,
      active: "Low Price"
    })
    console.log(this.state.active)
  }

  handleFilterHighRating = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(b.rating < a.rating) return -1;
      if(a.rating > b.rating) return 1;
    });
    this.setState({
      data: items,
      active: "High Rating"
    })
    console.log(this.state.active)
  }

  handleFilterLowRating = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(a.rating < b.rating) return -1;
      if(b.rating > a.rating) return 1;
    });
    this.setState({
      data: items,
      active: "Low Rating"
    })
    console.log(this.state.active)
  }

  changeSelectValue = () => {
    if (this.state.active === "High Price"){
        this.handleFilterHighPrice();
    } else if(this.state.active === "Low Price"){
      this.handleFilterLowPrice();
    } else if(this.state.active === "High Rating"){
      this.handleFilterHighRating();
    } else if(this.state.active === "Low Rating"){
      this.handleFilterLowRating();
    } else {
      this.componentDidMount();
    }
  }

  render(){
    const {currentPage, itemsPerPage, data} = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(data.length/ itemsPerPage); i++){
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if(number === currentPage){
        return(
          <li className="pageNumber"
              style={{color:"red"}}
              key={number}
              id={number}
              onClick={this.handlePageCount}
          >
              {number}
          </li>
        
        )
      } else {
        return(
          <li className="pageNumber"
              key={number}
              id={number}
              onClick={this.handlePageCount}
          >
             {number}
          </li>
        
        )
      }
    })
    return(
      <Container fixed>
        <Grid item justifycontent="center" style={{textAlign: "center"}}>
          <img src={LipstickImage} style={{height:"550px", width:"100%"}}></img>
          <Paper style={{padding: 5}}>
            <Searchbar submitQuery={this.handleRequest}></Searchbar>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Price/Rating</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={this.state.active}
                    onClick={() => this.changeSelectValue()}
                    onChange={this.handleChange}
                  >
                      <option aria-label="None" value="" />
                      <option value="High Price">Highest Price First</option>
                      <option value="Low Price">Lowest Price First</option>
                      <option value="High Rating">Highest Rating First</option>
                      <option value="Low Rating">Lowest Rating First</option>
                  </Select>
            </FormControl>
          </Paper>
            <ListMakeup data={currentItems} />
            <div className="table">
              <ul id="page-numbers">
              {/* <Pagination count={pageNumbers)} 
                  page={currentPage} 
                  siblingCount={0}
                  key={pageNumbers}
                  id={pageNumbers}
                  onChange={this.handlePageCount}
              />   */}
                <Typography variant="h6" component="h2">{renderPageNumbers}</Typography>
              </ul>
          </div>
        </Grid>
      </Container>
    )
  }
}

export default CategoryTemplate