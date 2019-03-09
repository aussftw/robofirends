import React from "react";
import { connect } from "react-redux";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";

import { setSearchField, requestRobots } from "../actions";

import "./App.css";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }
  // before swithcing to redux i was usnig constructor

  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchfield: ""
  //   };

  // i was using fetch before switched to redux-thunk, fetch was in a componentDidMount

  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(users => {
  //       this.setState({ robots: users });
  //     });

  // onSearchChange = (event) =>  {
  //   this.setState( { searchfield: event.target.value })
  // }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    // btw else if working here too, like that

    // if (this.state.robots.length === 0) {
    //   return <h1>Loading</h1>
    // } else {
    //   return (

    return isPending ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
