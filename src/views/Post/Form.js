import React, { Component } from "react";
import axios from "axios";
import { DirectUpload } from "activestorage";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      status: false,
      condition: "",
      description: "",
      image: null
    };
  }

  handleOnFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      user_id: this.props.user.id
    });
  };

  handleUpload = e => {
    this.setState({
      image: e.currentTarget.files[0]
    });
  };

  handlePost = e => {
    e.preventDefault();
    this.setState({
      status: !this.state.status
    });

    const post = {
      user_id: this.state.user_id,
      lat: this.props.lat,
      lng: this.props.lng,
      status: this.state.status,
      condition: this.state.condition,
      description: this.state.description,
      image: this.state.image
    };

    axios
      .post("http://localhost:3001/posts", post)
      .then(data => {
        if (data) {
          console.log(data);

          this.uploadFile(this.state.image, data.data);
        }
      })
      .catch(error => console.log(error.response));
  };

  uploadFile = (file, post) => {
    const upload = new DirectUpload(
      file,
      "http://localhost:3001/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        fetch(`http://localhost:3001/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ image: blob.signed_id })
        })
          .then(response => response.json())
          .then(result => console.log(result));
      }
    });
  };

  render() {
    // fix line 54!!!
    return (
      <div className="form">
        <form onSubmit={this.handlePost}>
          <input type="file" onChange={this.handleUpload.bind(this)}></input>
          <select
            defaultValue="none"
            name="condition"
            onChange={this.handleOnFormChange}
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
            onChange={this.handleOnFormChange}
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
