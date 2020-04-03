import React from 'react'
import '../component/Makeup.css'
import { Grid, Paper, Button, Select,FormControl,InputLabel,TextField, Container } from '@material-ui/core'

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

    resetSearch = () => {
        const { data } = this.props
        if(!data.length || data.length){
            this.setState({
                brands: "",
                starRating: "",
                tagList: ""
            })
            console.log(this.state.brands,this.state.starRating,this.state.tagList)
            // this.submitQuery();
        }

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
        <Grid className="grid-sizes" sm={12} xs={12} style={{margin:"0 auto",justifyContent: "center"}}>
            {/* <form onSubmit={this.submitQuery} style={{width:"100%"}}> */}
            <form onSubmit={this.submitQuery}>
            <FormControl className="selectWidth" variant="outlined">
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
            <FormControl className="selectWidth" variant="outlined">
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
            <FormControl className="selectWidth" variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Rating</InputLabel>
                  <Select
                    native
                    label="Price/Rating"
                    id="outlined-age-native-simple"
                    value={this.state.starRating}
                    onChange={this.handleRatingChange}
                  >
                    <option aria-label="None" value="" />
                    <option value="4">4 stars and above</option>
                    <option value="3">3 stars and above</option>
                    <option value="2">2 stars and above</option>
                    <option value="1">1 star and above</option>
                  </Select>
            </FormControl>
            <FormControl className="selectWidth" variant="outlined">
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
            <div>
                <div className="buttons">
                    <button variant="contained" color="primary" type="submit">Submit Filters</button>
                    {/* <button style={{display:"inline-block"}}>Reset Filters</button> */}
                </div>
                <div className="buttons" onClick={this.resetSearch}>
                    <button variant="contained" color="secondary" >Reset Filters</button>
                    {/* <button style={{display:"inline-block"}}>Reset Filters</button> */}
                </div>
            </div>
            </form>
        </Grid>
        )
    }
}

export default SearchBar