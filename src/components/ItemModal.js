import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItems } from "../actions/itemActions";
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const newItem = {
      name: name,
    };
    //add items
    this.props.addItems(newItem);

    //close modal
    this.toggle();
  };

  render() {
    const { modal } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div>
        { isAuthenticated ? <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button> : <h4 className="mb-3 ml-4">Please log in to manage</h4> }
        
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="dark">Add Item</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.Item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItems })(ItemModal);
