import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Pagination from "./components/Pagination/Pagination";
import { fetchPageItems } from "./utils/fetchPageItems";
import { noOfPages } from "./utils/noOfPages";
import HackernewsList from "./components/HackernewsList/HackernewsList";
import { fetchItem } from "./utils/fetchItem";

const tags = ["Top", "New", "Show", "Ask", "Jobs"];

class App extends React.Component {
  state = {
    allpageitems: [],
    currentPageItems: [],
    currentPage: 1,
    isLoading: true
  };

  totalPages() {
    return noOfPages(this.state.allpageitems.length);
  }

  getPageItemsIndices(page) {
    if (page === this.totalPages())
      return [20 * (this.state.currentPage - 1), this.state.allpageitems.length - 1];
    return [20 * (this.state.currentPage - 1), 20 * this.state.currentPage - 1];
  }

  getPageItems() {
    const { allpageitems } = this.state;
    let [start, end] = this.getPageItemsIndices(this.state.currentPage);
    console.log(start, end);
    const promiseArr = [];
    for (let i = start; i <= end; i++) {
      promiseArr.push(fetchItem(allpageitems[i]));
    }
    return Promise.all(promiseArr).then(resultArr => {
      return Promise.all(resultArr.map(res => res.json()));
    });
  }

  changePage = type => {
    if (type === "increment"){
      let page = this.state.currentPage + 1;
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
          isLoading: true
        }),
        () => {
          this.getPageItems().then(result => {
            if(this.state.currentPage===page)
            this.setState({
              currentPageItems: result,
              isLoading: false
            });
          });
        }
      )
    }
    else {
      let page = this.state.currentPage - 1;
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
          isLoading: true
        }),
        () => {
          this.getPageItems().then(result => {
            if (this.state.currentPage === page)
              this.setState({
                currentPageItems: result,
                isLoading: false
              });
          });
        }
      );
    }
  };

  componentDidMount() {
    console.log("hey")
    let page = this.props.match.url.slice(1);
    if(page.length===0) page="top"
    fetchPageItems(page).then(items => {
      this.setState(
        {
          allpageitems: items,
          currentPage: 1
        },
        () => {
          this.getPageItems().then(result => {
            this.setState({
              currentPageItems: result,
              isLoading: false
            });
          });
        }
      );
    });
  }

  render() {
    return (
      <div>
        <Header tags={tags} />
        <Pagination
          currentPage={this.state.currentPage}
          changePage={this.changePage}
          pages={this.totalPages()}
        />
        <main className="main">
          <HackernewsList
            items={this.state.currentPageItems}
            isLoading={this.state.isLoading}
          />
        </main>
      </div>
    );
  }
}

export default App;
