import React from 'react';
import { render } from 'react-dom';
import ListDisplay from '../containers/listDisplay.jsx';
import ItemCreator from '../containers/itemCreator.jsx';



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listItem: '',
      priority: '',
      itemList: [],
      points: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
 /*
 ****** THIS WILL PERFORM GET REQUEST TO SERVER/DATABASE TO RETRIEVE LIST OF ITEMS *******
 */
  componentDidMount(){
    console.log('going to fetch');
    fetch('/update')
      .then(response => {
        // console.log('this is the response', response)
        return response.json();
      })
      .then(list => {
        console.log('this is the list of todos:', list);
        this.setState({
          ...this.state,
          itemList: list
        });
      }).catch(err => {
        console.log('There was an error retreiving the to-do list: ', err);
      })
  }

 /*
 ******* THIS WILL WORK TO UPDATE THE STATE AS THE USER IS TYPING OR SELECTING A PRIORITY LEVEL ******
 */
  handleChange(e) {
    // console.log('text is added and event type is: ', e.target.type)
    // console.log('text value is: ', e.target.value)
    if (e.target.type === 'text'){
      this.setState({
        listItem: e.target.value
      })
    }
    else if (e.target.type === 'select-one'){
      this.setState({
        priority: e.target.value
      })
    }
    // console.log('text value is: ', this.state.listItem)
    //console.log('text value is: ', this.state.priority)
  }

/**
 ********* THIS PROVIDES USER FUNCTIONALITY TO SUBMIT A TO-DO ITEM INTO THE LIST *********
 NOTE: THIS WILL ALSO STORE THE ADDED ITEM INTO THE DATABASE
 */
  handleSubmit(e){
    // console.log('text value is: ', this.state.listItem)
    // console.log('priority is: ', this.state.priority)
    //console.log('this is what is in e: ', e.target.value)
    e.preventDefault(); // this prevents the form from firing!
    // console.log('the event is:', e);
    fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listItem: this.state.listItem,
        priority: this.state.priority
      })
    }).then(response => response.json())
      .then((list) => {
        this.setState({
          itemList: list
        })
    })
    
  }
  /*
  ****** THIS PROVIDES FUNCTIONALITY THAT ALLOWS USER TO REMOVE A TO-DO ITEM *******
  NOTE: THIS WILL WORK TO DELETE THE ITEM FROM THE DATABASE
  */
  handleDelete(id, priority){
    // console.log('this one needs to be deleted: ', id);
    // this will provide details of the point system and 
    const pointSystem = {
      "High": 5,
      "Moderate": 3,
      "Low": 1
    };
    this.setState((prevState) =>({
      points: prevState.points + pointSystem[priority]
    }))

    fetch('/update', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    }).then(response => response.json())
      .then((list) => {
        this.setState({
          itemList: list
        })
      })
  }

  render(){
    return(
      <div id='app'>
        
        <h1>THE HANDY DANDY TO-DO LIST!</h1>
        <ItemCreator 
          text={this.state.listItem} 
          handleSubmit={this.handleSubmit} 
          handleChange={this.handleChange}
          points={this.state.points}
        />
        <ListDisplay 
          handleDelete={this.handleDelete} 
          list={this.state.itemList}
        />

      </div>
    )
  }

}

export default App;