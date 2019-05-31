import React,{Component} from 'react';
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";
import './App.css';
import Selection from './components/Selection';
import { Fragment } from 'react';
import { Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import AddSelect from './components/AddSelect';
import axios from 'axios';


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
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }



  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }


  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }



   // Toggle Complete
  markComplete = (id) => {
    this.setState({ select: this.state.selection.list(select => {
      if(select.id === id) {
          <select id=""></select>.completed = !select.completed
      }
      return select;
    }) });
  }



  // Delete Select
  delSelect = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/selection/${id}`)
      .then(res => this.setState({ selection: [...this.state.selection.filter(select => select.id !== id)] }));
  }



  // Add Select
  addSelect = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/selection', {
      title,
      completed: false
    })
      .then(res => this.setState({ selection: [...this.state.selection, res.data] }));
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
              <Row id="select">

                    <React.Fragment>
                        <AddSelect addSelect={this.addSelect} />
                        <Selection selection={this.state.selection} markComplete={this.markComplete} delSelect={this.delSelect} />
                    </React.Fragment>

              </Row>

          </Col>

              <Col >Treemap
                  <Button onAdd="onSubmit()" id="button" id="ADD" variant="primary" size="sm">
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

    </Fragment>

    );
  }
}
 export default App;
