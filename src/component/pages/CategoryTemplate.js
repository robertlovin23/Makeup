import React from 'react';
import makeup from '../../api/makeup'
import ListMakeup from '../list/ListMakeup'
import Searchbar from '../Searchbar'
import LipstickImage from '../../img/lipstick.jpg'
import '../Makeup.css'
import { Grid,Paper, Button, FormControl, Container,Typography,Select,InputLabel,MenuItem, NativeSelect } from '@material-ui/core'

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

  handleRequest = async (brands,starRating,tagList) => {
    const props = this.props

    const link = props.match.url.substring(1)
    console.log(link)
    const response =  await makeup.get(`/products.json?product_type=${link}`, {
      params: {
        brand: brands,
        rating_greater_than: starRating,
        product_tags: tagList
      }
    })

    this.setState({
      data: response.data,
      selectedItem: response.data[0]
    })
  }

  selectedProduct = (product) => {
    this.setState({
      selectedItem: product
    })
    console.log(product)
  }

  componentDidMount = () => {
    this.handleRequest();
    // this.pageTitle();
  }

  componentDidUpdate = (prevProps) => {
    console.log(this.props,prevProps)
    if(this.props.match.url !== prevProps.match.url){
      this.handleRequest();
    }
  }

  handleFilterHighPrice = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(Number(b.price) < Number(a.price)) return -1;
      if(Number(a.price) > Number(b.price)) return 1;
    });
    this.setState({
      data: items,
      active: "High Price"
    })
    console.log(this.state.active)
  }

  handleFilterLowPrice = () => {
    const items = [...this.state.data].sort((a,b) => {
      if(Number(a.price) < Number(b.price)) return -1;
      if(Number(b.price) > Number(a.price)) return 1;
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
    // } else if (this.state.active === "") {
    //   this.componentDidMount();
    // }
    }
  }

  resetFilters = () => {
    this.componentDidMount();
  }
   
  render(){
    const {currentPage, itemsPerPage, data} = this.state;
    
    const title = this.props.match.url.substring(1)
    const { links } = this.props
    console.log(title,links)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(data.length/ itemsPerPage); i++){
      pageNumbers.push(i)
    }

    const titles = title.replace(/(^|_)./g, s => s.slice(-1).toUpperCase())
    const spaces = titles.replace(/([A-Z])/g, ' $1').trim()

    console.log(spaces)


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
      <Container fixed style={{padding:"20px 20px"}}>
        <Grid item justifycontent="center" style={{textAlign: "center"}}>
          <Typography variant="h2" style={{paddingBottom:"20px"}}>
            {spaces}     
          </Typography>

          {/* <img src={LipstickImage} style={{height:"550px", width:"100%"}}></img> */}
            <Searchbar submitQuery={this.handleRequest} 
                        data={this.state.data}
                        handleChange={this.handleChange}
                        changeSelectValue={this.changeSelectValue}
                        active={this.state.active}></Searchbar>
            <Typography variant="subtitle2" style={{float:"left"}}>
              {data.length} results
            </Typography>
            <ListMakeup data={currentItems} selectedProduct={this.selectedProduct}/>
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