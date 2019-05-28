import React,{Component} from 'react';
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";
import './App.css';
import Selection from './components/Selection';
import { Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';


let data= require("./data")


class App extends Component {
        state={
            contacts:[],
            selection:[
                {
                id: 1,
                title:'Take out the train'
                }
                ]


}



    componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
    })
    .catch(console.log)
  }


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false

    };
    this.toggle1 = this.toggle1.bind(this);
    this.state = {
      dropdownOpen1: false};

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      dropdownOpen2: false};
  }


  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggle1() {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }


    render() {

        return (

          <Fragment>
            <Navbar color="faded" light expand="md">

              <NavbarBrand href="/">
                idealGraph
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="https://www.techiediaries.com/react-bootstrap">
                    Help
                  </NavLink>
                </NavItem>


              </Nav>
            </Navbar>


    <div id="container">
      <Row id="all">

        <Col id="Navi">
          <Col  id="Selection">Selection
              <Row id="selc">

                  <div></div>


                        <Dropdown id="Dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                          AND
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem > AND </DropdownItem>
                          <DropdownItem> OR </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>


                  <div></div>


                     <Dropdown id="Dropdown" isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                        <DropdownToggle caret>
                          AND
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem > AND </DropdownItem>
                          <DropdownItem> OR </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                   <Dropdown id="Dropdown" isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                        <DropdownToggle caret>
                          AND
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem > AND </DropdownItem>
                          <DropdownItem> OR </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                  <div></div>


              </Row>
              <Row ><div id="vl"></div><div id="vl"></div><div id="vl"></div>
              </Row>

          </Col>

          <Col >Treemap
              <Button onAdd="myFunction()" id="button" id="ADD" variant="primary" size="sm">
                  ADD
              </Button>
            <TreeMap data={data}/>
          </Col>
        </Col>

      <Col xs={3} id="Visu">

        <Col  >Suchleiste
            <Col >
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </Col>
        </Col>

        <Col  id="Graphen">Graphen</Col>
          <Col>Buttons
              <Button id="button" variant="primary" size="sm">
                      Run
              </Button>
              <Button id="button" variant="secondary" size="sm">
                      Edit
              </Button>
              <Button id="button" variant="secondary" size="sm">
                      Reset
              </Button>
          </Col>
        </Col>

        </Row>
    </div>

      <script>
      </script>

        </Fragment>

        );
  }
}
 export default App;
