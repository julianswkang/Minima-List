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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log('going to fetch');
    fetch('/update')
      .then(response => {
        console.log('this is the response', response)
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
  }

  handleSubmit(e){
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

  render(){
    return(
      <div id='app'>
        <h1>THE HANDY DANDY TO-DO LIST!</h1>
        <ItemCreator text={this.state.listItem} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <ListDisplay list={this.state.itemList}/>

      </div>
    )
  }

}

export default App;