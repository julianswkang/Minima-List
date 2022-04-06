import React from 'react';
import { render } from 'react-dom';
import ListItem from '../components/listItem.jsx'


class ListDisplay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      itemList: []
    }
  }

  componentDidMount(){
    fetch('/update')
      .then(response => {
        // console.log('this is the response', response)
        return response.json();
      })
      .then(list => {
        // console.log('this is the list of todos:', list);
        this.setState({
          itemList: list
        });
      }).catch(err => {
        console.log('There was an error retreiving the to-do list: ', err);
      })
  }

  render(){
    let listLength = this.state.itemList.length;
    let stateList = this.state.itemList;
    const list = [];
    for (let i = 0; i < listLength; i++){
      const {listItem, priority, date, _id} = stateList[i];
      list.push(
        <ListItem 
          todo={listItem} 
          priority={priority} 
          date={date} 
          key={_id}
        />
      )
    }
    // console.log('render invoked!');
    return (

      <div className='listBox'>
        <div className='listTitle'>
          <h3>To-Do's to do: </h3>
        </div>
        <div className='todoList'>
          {list}
        </div>
        
      </div>

    )
  }
}

export default ListDisplay;