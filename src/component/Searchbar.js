import React from 'react'
import { Grid,Paper,Select,FormControl,InputLabel,TextField, Container } from '@material-ui/core'

class SearchBar extends React.Component{
    state = {
        brands: "",
        starRating: "",
        tagList: ""
    }

    onBrandChange = (event) => {
        this.setState({
            brands: event.target.value
        })
    }
    
    onTagChange = (event) => {
        this.setState({
            tagList: event.target.value
        })
    }

    handleRatingChange = (event) => {
        this.setState({
            starRating: event.target.value
        })
    }

    submitQuery = (event) => {
        event.preventDefault();
        this.props.submitQuery(
            this.state.brands,
            this.state.starRating,
            this.state.tagList
        )
    }


    render(){
        const { data,changeSelectValue,active,handleChange } = this.props
        console.log(data)

        const filteredData = data.filter(function(value){
            console.log(value)
        })
        console.log(filteredData)

        const unique = data.filter(function({brand}) {
            const key = `${brand}`
            return !this.has(key) && this.add(key)
        }, new Set)

        const tags = data.filter(function({tag_list}) {
            const key = `${tag_list}`
            return !this.has(key) && this.add(key)
        }, new Set)

        console.log(unique)
        return(
        <Grid container style={{margin:"0 auto",justifyContent: "center", paddingTop:"15px"}}>
            {/* <form onSubmit={this.submitQuery} style={{width:"100%"}}> */}
            <form onSubmit={this.submitQuery}>
            <FormControl variant="outlined" style={{paddingRight:"15px"}}>
              <InputLabel htmlFor="outlined-age-native-simple">Price/Rating</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={active}
                    onClick={() => changeSelectValue(active)}
                    onChange={handleChange}
                  >
                      <option aria-label="None" value="" />
                      <option value="High Price">Highest Price First</option>
                      <option value="Low Price">Lowest Price First</option>
                      <option value="High Rating">Highest Rating First</option>
                      <option value="Low Rating">Lowest Rating First</option>
                  </Select>
            </FormControl>
            <FormControl variant="outlined" style={{paddingRight:"15px"}}>
              <InputLabel htmlFor="outlined-age-native-simple">Brands</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={this.state.brands}
                    onChange={this.onBrandChange}
                  >
                    <option aria-label="None" value="" />
                      {
                          unique.map((brand,i) => {
                              console.log(i,brand)
                                return(
                                    <option key={i} value={brand.brand}>{brand.brand}</option>
                                )
                          })
                      }
                  </Select>
            </FormControl>
            <FormControl variant="outlined" style={{paddingRight:"15px"}}>
              <InputLabel htmlFor="outlined-age-native-simple">Rating</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={this.state.starRating}
                    onChange={this.handleRatingChange}
                  >
                    <option aria-label="None" value="" />
                    <option value="5">5 stars</option>
                    <option value="4">4 stars and above</option>
                    <option value="3">3 stars and above</option>
                    <option value="2">2 stars and above</option>
                    <option value="1">1 star and above</option>
                  </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Tags</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={this.state.tagList}
                    onChange={this.onTagChange}
                  >
                    <option aria-label="None" value="" />
                      {
                          tags.map((tags,i) => {
                              console.log(i,tags)
                                if(tags.tag_list.length){
                                return(
                                    <option key={i} value={tags.tag_list}>{tags.tag_list}</option>
                                )}
                            }
                        )
                      }
                  </Select>
            </FormControl>
            <button onSubmit={this.submitQuery}>Submit Filter</button>
            </form>
            {/* </form> */}
        </Grid>
        )
    }
}

export default SearchBar