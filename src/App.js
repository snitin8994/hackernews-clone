import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Pagination from "./components/Pagination/Pagination";
import { fetchPageItems } from "./utils/fetchPageItems";
import { noOfPages } from "./utils/noOfPages";
import HackernewsList from "./components/HackernewsList/HackernewsList";
import { fetchItem } from "./utils/fetchItem";

const pagetoUrlMapper= {
  "Top":"top",
  "Show": "show",
  "Ask": "ask",
  "Jobs": "job",
  "New": "new"
}

const tags = ["Top", "New", "Show", "Ask", "Jobs"];

class App extends React.Component {
  state = {
    pageHeader:"Top",
    allpageitems: [],
    currentPageItems: [],
    currentPage: 1,
    isLoading: true
  };

  totalPages() {
    return noOfPages(this.state.allpageitems.length);
  }

  getPageItemsIndices(page) {
    let currentPage = page || this.state.currentPage;
    if (page === this.totalPages())
      return [20 * (currentPage - 1), this.state.allpageitems.length - 1];
    return [20 * (currentPage - 1), 20 * currentPage - 1];
  }

  getPageItems(page) {
    const { allpageitems } = this.state;
    let currentPage = page || this.state.currentPage;
    let [start, end] = this.getPageItemsIndices(currentPage);
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
    if (type === "increment") {
      let page = this.state.currentPage + 1;
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
          isLoading: true
        }),
        () => {
          if (this.cachedPageResult[page - 1]) {
            this.setState({
              currentPageItems: this.cachedPageResult[page - 1],
              isLoading: false
            });

              if (page + 1 <= this.totalPages() && !this.cachedPageResult[page+1])
                this.getPageItems(page + 1).then(result => {
                  this.cachedPageResult[page] = result;
                });
            return;
          }
          this.getPageItems().then(result => {
            this.cachedPageResult[page - 1] = result;
            if (this.state.currentPage === page) {
              this.setState({
                currentPageItems: result,
                isLoading: false
              });

              if (page + 1 <= this.totalPages())
                this.getPageItems(page + 1).then(result => {
                  this.cachedPageResult[page] = result;
                });
            }
          });
        }
      );
    } else {
      let page = this.state.currentPage - 1;
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
          isLoading: true
        }),
        () => {
          if (this.cachedPageResult[page - 1]) {
            this.setState({
              currentPageItems: this.cachedPageResult[page - 1],
              isLoading: false
            });
            return;
          }
          this.getPageItems().then(result => {
            this.cachedPageResult[page - 1] = result;
            if (this.state.currentPage === page) {
              this.setState({
                currentPageItems: result,
                isLoading: false
              });
            }
          });
        }
      );
    }
  };

  firstPagefetch=(page)=> {
        fetchPageItems(page).then(items => {
          this.setState(
            {
              allpageitems: items,
              currentPage: 1
            },
            () => {
              this.getPageItems().then(result => {
                //cache the result of 1st page
                console.log(result);
                this.cachedPageResult = [];
                this.cachedPageResult[0] = result;
                console.log(this.cachedPageResult);
                let currentPage = this.state.currentPage;

                this.setState({
                  currentPageItems: result,
                  isLoading: false
                });
                //make request for next page if there
                if (currentPage + 1 <= this.totalPages())
                  this.getPageItems(currentPage + 1).then(result => {
                    this.cachedPageResult.push(result);
                  });
              });
            }
          );
        });

  }



  componentDidMount() {
    this.firstPagefetch("top")

  }

  changePageHeader=(newPageHeader)=>{
      this.setState({
        pageHeader:newPageHeader ,
        allpageitems: [],
        currentPageItems: [],
        currentPage: 1,
        isLoading: true
      },()=> {
        this.firstPagefetch(pagetoUrlMapper[this.state.pageHeader])
      })
    
  }

  render() {
    return (
      <div>
        <Header changePageheader={this.changePageHeader} tags={tags} />
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
