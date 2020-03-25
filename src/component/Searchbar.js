import React from 'react'
import { Grid,Paper,TextField, Container } from '@material-ui/core'

class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            query: ""
        }
    }

    handleQueryChange = (event, name) => {
        console.log(event.target)
        this.setState({
            query: event.target.value
        })
    }

    submitQuery = (event) => {
        event.preventDefault()
        this.props.submitQuery(
            this.state.query
        )
    }

    render(){
        return(
            <form onSubmit={this.submitQuery}>
                <TextField
                    id="outlined-full-width"
                    label="Brand Name"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleQueryChange}
                    placeholder="Brand Name..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </form>
        )
    }
}

export default SearchBar