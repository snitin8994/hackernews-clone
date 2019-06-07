import React from 'react';
import './App.css';
import Header from "./components/header/Header"
import Pagination from "./components/Pagination/Pagination"
import {fetchPageitems} from "./utils/fetchPageItems"

const tags=["Top","New","Show","Ask","Job"]

class App extends React.Component {

  state={
    currentPage:1,
    currentSelectedStory:0
  }

  componentDidMount() { 
    let page =this.props.match.url.slice(1)
  }
  
  render() {
  return (
    <>
    <Header tags={tags} />
    <Pagination />
    </>

  )
  }
}

export default App;
