import React from 'react';
import { render } from 'react-dom';

class ItemCreator extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listItem: ' ',
      priority: ' '
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('text is added and event type is: ', e.target.type)
    if (e.target.type === 'text'){
      this.setState({
        listItem: e.target.value
      })
    }
    else{
      this.setState({
        priority: e.target.value
      })
    }
  }

  handleSubmit(e){
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
    }).then(()=> {
      console.log('you have added a list item');
    })
  }

  render(){
    return (
     <div>
       <form onSubmit={this.handleSubmit}>
        <label>To Do: </label>
        <input type='text' onChange={this.handleChange} required/>
        
        <label>
          Priority level:
          <select onChange={this.handleChange}>
            <option value='High'>High</option>
            <option value='Moderate'>Moderate</option>
            <option value='Low'>Low</option>
          </select>
        </label>
        <input type='submit' value='Add'/>
      </form>
     </div>
    );
  }
}

export default ItemCreator;