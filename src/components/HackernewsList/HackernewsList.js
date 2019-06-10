import React from "react";
import HackernewsItem from "../HackersnewsItem/HackernewsItem";
import { fetchItem } from "../../utils/fetchItem";
import Spinner from "react-spinkit";
import style from "./HackernewsList.module.css"

class HackernewsList extends React.Component {
  state = {
    pageItems: [],

  };
  getPageItemsIndices(page) {
    if (page === this.props.pages)
      return [20 * (this.props.currentPage - 1), this.props.items.length - 1];
    return [20 * (this.props.currentPage - 1), 20 * this.props.currentPage - 1];
  }

  getPageItems() {
    const { items } = this.props;
    let [start, end] = this.getPageItemsIndices(this.props.currentPage);
    console.log(start,end)
    const promiseArr = [];
    for (let i = start; i <= end; i++) {
      promiseArr.push(fetchItem(items[i]));
    }
    return Promise.all(promiseArr);
  }

  componentDidUpdate(prevProps, prevState) {

    if ( prevProps.currentPage!== this.props.currentPage) {
      this.getPageItems()
        .then(resultArr => {
          return Promise.all(resultArr.map(res => res.json()));
        })
        .then(result => {
          this.setState({
            pageItems: result
          });
        });
    }
  }

  render() {
    return (
      <div className={style.container}>
        {this.state.pageItems.length == 0 ? (
          <Spinner name="ball-scale-ripple" color="steelblue" />
        ) : (
          this.state.pageItems.map((story, index) => (
            <HackernewsItem key={index} story={story} />
          ))
        )}
      </div>
    );
  }
}

export default HackernewsList;
