import React from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';

import { setSearchField } from '../actions';

import './App.css';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  } 
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      return response.json()
    })
    .then(users => {
      this.setState({ robots: users })
    })
  }

  // onSearchChange = (event) =>  {
  //   this.setState( { searchfield: event.target.value })
  // }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase()); 
    })

    // btw else if working here too, like that
    
    // if (this.state.robots.length === 0) {
    //   return <h1>Loading</h1>  
    // } else {
    //   return (

    return !robots.length ?
     <h1>Loading</h1> :
      (
        <div className='tc'> 
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} /> 
          <Scroll>
            <ErrorBoundry>
             <CardList robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }  
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);