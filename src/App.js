import React, { Component } from "react";
import { connect } from "react-redux";
import * as recordAction from "./actions/recordAction";
import { Modal, Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.editRecord = this.editRecord.bind(this);

    this.state = {
      name: "",
      show: false,
      index: "",
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let record = {
      name: this.state.name,
    };
    this.setState({
      name: "",
    });
    this.props.createRecord(record);
  }

  editRecord(e) {
    e.preventDefault();
    let record = {
      name: this.state.name,
    };
    let index = {
      index: this.state.index,
    };
    this.props.editRecord(record, index);
    this.setState({
      show: false,
      name: "",
    });
  }

  handleShow = (e, index) => {
    this.setState({
      show: true,
      index: index,
    });
  };
  deleteRecord(e, index) {
    e.preventDefault();
    this.props.deleteRecord(index);
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  listView(data, index) {
    return (
      <div className="row">
        <div className="col-md-10">
          <li
            key={index}
            style={{ marginBottom: "5px" }}
            className="list-group-item clearfix"
          >
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button
            style={{ marginRight: "5px" }}
            onClick={(e) => this.handleShow(e, index)}
            className="btn btn-primary"
          >
            edit
          </button>
          <button
            onClick={(e) => this.deleteRecord(e, index)}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              // value={this.state.name}
            />
            <br />
            <input type="submit" className="btn btn-success" value="ADD" />
          </form>
          <hr />
          {
            <ul className="list-group">
              {this.props.records.map((record, i) => this.listView(record, i))}
            </ul>
          }
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              onChange={this.handleChange}
              className="col-md-12"
              // value={this.state.name}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={this.editRecord}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.records,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRecord: (record) => dispatch(recordAction.createRecord(record)),
    deleteRecord: (index) => dispatch(recordAction.deleteRecord(index)),
    editRecord: (record, index) =>
      dispatch(recordAction.editRecord(record, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
