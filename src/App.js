import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Pagination from "./components/Pagination/Pagination";
import { fetchPageItems } from "./utils/fetchPageItems";
import { noOfPages } from "./utils/noOfPages";
import HackernewsList from "./components/HackernewsList/HackernewsList";

const tags = ["Top", "New", "Show", "Ask", "Jobs"];

class App extends React.Component {
  state = {
    items: [],
    currentPage: 0
  };

  totalPages() {
    return noOfPages(this.state.items.length);
  }

  changePage = type => {
    if (type === "increment")
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    else {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }));
    }
  };

  componentDidMount() {
    let page = this.props.match.url.slice(1);
    fetchPageItems("top").then(items => {
      this.setState({
        items,
        currentPage:1
      });
    });
  }

  render() {
    return (
      <>
        <Header tags={tags} />
        <Pagination
          currentPage={this.state.currentPage}
          changePage={this.changePage}
          pages={this.totalPages()}
        />
        <HackernewsList
          currentPage={this.state.currentPage}
          pages={this.totalPages()}
          items={this.state.items}
        />
      </>
    );
  }
}

export default App;
