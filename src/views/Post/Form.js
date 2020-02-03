import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      condition: "",
      description: ""
    };
  }

  // handleStatusChange = () => {
  //   this.setState({
  //     status: !this.state.status
  //   });
  // };

  handleConditionChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePost = e => {
    e.preventDefault();
    this.setState({
      status: !this.state.status
    });
    console.log(this.state);
  };

  render() {
    console.log(this.state.status);

    return (
      <div className="form">
        <form onSubmit={this.handlePost}>
          <input type="file"></input>
          <select
            defaultValue="none"
            name="condition"
            onChange={this.handleConditionChange}
          >
            <option value="none" disabled hidden>
              Please Select Item Condition
            </option>
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="New">Like New</option>
          </select>
          <br /> <br />
          <input
            className="text-box"
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
          ></input>
          <br />
          <br />
          <input
            className="button button__primary"
            type="submit"
            value="Post"
          />
        </form>
      </div>
    );
  }
}

export default Form;
