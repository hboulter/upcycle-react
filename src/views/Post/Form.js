import React, { Component } from "react";
import axios from "axios";
import { DirectUpload } from "activestorage";
import "./Post.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      status: false,
      title: "",
      condition: "",
      description: "",
      image: null,
      imageUrl: null,
      imageName: "",
      errors: []
    };
  }

  handleOnFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      user_id: this.props.user.id,
      status: true
    });
  };

  handleUpload = e => {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        image: file,
        imageUrl: fileReader,
        imageName: file.name
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  postSubmitted = () => {
    alert("Post successfully submitted!");
  };

  handlePost = e => {
    e.preventDefault();

    const post = {
      user_id: this.state.user_id,
      lat: this.props.lat,
      lng: this.props.lng,
      status: this.state.status,
      title: this.state.title,
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
        if (data.data.id === null) {
          alert("Must be logged in to make a post.");
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
    return (
      <div className="form">
        <form onSubmit={this.handlePost}>
          <div className="form__right">
            <select
              defaultValue="none"
              name="title"
              className="container dropdown"
              onChange={this.handleOnFormChange}
            >
              <option value="none" disabled hidden>
                Category
              </option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <select
              defaultValue="none"
              name="condition"
              className="container dropdown"
              onChange={this.handleOnFormChange}
            >
              <option value="none" disabled hidden>
                Condition
              </option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Like New">Like New</option>
            </select>
            <br />
            <label for="upload" className="file-upload">
              Image
            </label>
            <span className="file-path">
              {this.state.imageName.length > 10
                ? `${this.state.imageName.substring(0, 10)}...`
                : this.state.imageName}
            </span>
            <input
              id="upload"
              type="file"
              className="file-upload__input"
              onChange={this.handleUpload.bind(this)}
            ></input>
          </div>
          <div className="form__left">
            <label htmlFor="description">Description:</label>
            <textarea
              autoComplete="off"
              className="text-box"
              name="description"
              onChange={this.handleOnFormChange}
              value={this.state.description}
              placeholder="e.g. In the alley behind the SXSW building"
            ></textarea>
          </div>
          <input
            className="submit button button__primary"
            type="submit"
            value="Post"
            onClick={() => this.postSubmitted()}
          />
        </form>
      </div>
    );
  }
}

export default Form;
