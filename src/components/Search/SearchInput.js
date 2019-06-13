import React from "react";
import style from "./SearchInput.module.css"
import onClickOutside from "react-onclickoutside";


class SearchInput extends React.Component {
  state = {
    query: ""
  };

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };
  handleClickOutside = evt => {
    this.setState({
      query:""
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      query: ""
    });
    this.props.search(this.state.query);
  };

  render() {
    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <input
          className={style.input}
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search.."
        />
      </form>
    );
  }
}

export default onClickOutside(SearchInput);