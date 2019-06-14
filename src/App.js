import React from "react";
import "./App.css";
import Select from "react-select";
import Header from "./components/header/Header";
import Pagination from "./components/Pagination/Pagination";
import { fetchPageItems } from "./utils/fetchPageItems";
import { noOfPages } from "./utils/noOfPages";
import HackernewsList from "./components/HackernewsList/HackernewsList";
import { fetchItem } from "./utils/fetchItem";
import { fetchAlgoliaSearchResults } from "./utils/fetchAlgoliaSearchResults";

const pagetoUrlMapper = {
  Top: "top",
  Show: "show",
  Ask: "ask",
  Jobs: "job",
  New: "new"
};

const tags = ["Top", "New", "Show", "Ask", "Jobs"];

const options = tags.map((tag)=> ({
  value: tag,
  label: tag
}))

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #f60",
    color: state.isSelected ? "red" : "#f60",
    padding: 10,
    fontSize: "1.3rem",
    fontFamily: "'Roboto', sans-serif"
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const fontSize ="1.3rem"
    // const fontFamily: "'Roboto', sans-serif";

    return { ...provided, opacity, transition,fontSize };
  }
};


class App extends React.Component {
  state = {
    pageHeader: "Top",
    allpageitems: [],
    currentPageItems: [],
    currentPage: 1,
    isLoading: true,
    totalSearchPages: 1,
    selectedOption: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption },()=> {
      this.changePageHeader(this.state.selectedOption.value)
    });
  };

  fetchSearchResults = page => {
    return fetchAlgoliaSearchResults(
      this.searchQuery,
      page - 1 || this.state.currentPage - 1
    );
  };

  search = query => {
    this.searchQuery = query;
    this.cachedPageResult = [];
    this.setState(
      {
        pageHeader: "Search",
        allpageitems: [],
        currentPageItems: [],
        currentPage: 1,
        isLoading: true,
        totalSearchPages: 1,
        selectedOption: null
      },
      () => {
        this.fetchSearchResults().then(result => {
          this.cachedPageResult.push(result.hits);
          this.setState({
            currentPageItems: result.hits,
            isLoading: false,
            totalSearchPages: result.nbPages
          });
        });
      }
    );
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

  getPageItems = page => {
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
  };

  handlePageNextClick = () => {
    let totalNopages = this.totalPages();
    let fetchFunc = this.getPageItems;
    if (this.state.pageHeader === "Search") {
      totalNopages = this.state.totalSearchPages;
      fetchFunc = this.fetchSearchResults;
    }

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

          if (page + 1 <= totalNopages && !this.cachedPageResult[page])
            fetchFunc(page + 1).then(result => {
              let finalresult = result;
              if (this.state.pageHeader === "Search") finalresult = result.hits;
              this.cachedPageResult[page] = finalresult;
            });
          return;
        }
        fetchFunc(page).then(result => {
          let finalresult = result;
          if (this.state.pageHeader === "Search") finalresult = result.hits;
          this.cachedPageResult[page - 1] = finalresult;
          if (this.state.currentPage === page) {
            this.setState({
              currentPageItems: finalresult,
              isLoading: false
            });

            if (page + 1 <= totalNopages)
              fetchFunc(page + 1).then(result => {
                let finalresult = result;
                if (this.state.pageHeader === "Search")
                  finalresult = result.hits;
                this.cachedPageResult[page] = finalresult;
              });
          }
        });
      }
    );
  };

  handlePagePrevClick = () => {
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
      }
    );
  };

  changePage = type => {
    if (type === "increment") {
      this.handlePageNextClick();
    } else {
      this.handlePagePrevClick();
    }
  };

  firstPagefetch = page => {
    fetchPageItems(page).then(items => {
      this.setState(
        {
          allpageitems: items
        },
        () => {
          this.getPageItems().then(result => {
            //cache the result of 1st page
            console.log(result);
            this.cachedPageResult = [];
            this.cachedPageResult[0] = result;
            console.log(this.cachedPageResult);
            let currentPage = this.state.currentPage;
            if (pagetoUrlMapper[this.state.pageHeader] === page) {
              this.setState({
                currentPageItems: result,
                isLoading: false
              });

              //make request for next page if there
              if (currentPage + 1 <= this.totalPages())
                this.getPageItems(currentPage + 1).then(result => {
                  this.cachedPageResult.push(result);
                });
            }
          });
        }
      );
    });
  };

  componentDidMount() {
    this.firstPagefetch("top");
  }

  changePageHeader = newPageHeader => {
    this.setState(
      {
        pageHeader: newPageHeader,
        allpageitems: [],
        currentPageItems: [],
        currentPage: 1,
        isLoading: true,
        totalSearchPages: 1,
        selectedOption: {label:newPageHeader,value:newPageHeader}
      },
      () => {
        this.firstPagefetch(pagetoUrlMapper[this.state.pageHeader]);
      }
    );
  };

  render() {
    return (
      <div>
        <Header
          changePageheader={this.changePageHeader}
          tags={tags}
          search={this.search}
          pageHeader={this.state.pageHeader}
        />
        <div className="page-select">
          <Select
            styles={customSelectStyles}
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>

        <Pagination
          currentPage={this.state.currentPage}
          changePage={this.changePage}
          pages={this.totalPages()}
          isLoading={this.state.isLoading}
          pageHeader={this.state.pageHeader}
          totalSearchPages={this.state.totalSearchPages}
        />
        <main className="main">
          <HackernewsList
            items={this.state.currentPageItems}
            isLoading={this.state.isLoading}
            totalSearchPages={this.state.totalSearchPages}
          />
        </main>
      </div>
    );
  }
}

export default App;
