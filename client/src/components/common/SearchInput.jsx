import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

function SearchInput({ onSubmit, onChange, value }) {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Form onSubmit={onSubmit} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={value}
                onChange={onChange}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default SearchInput;
