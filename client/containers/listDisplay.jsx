import React from 'react';
import { render } from 'react-dom';
import ListItem from '../components/listItem.jsx'


const ListDisplay = (props) => {
  console.log(props);
  let listLength = props.list.length;
  let propsList = props.list;
  const list = [];
  for (let i = 0; i < listLength; i++){
    const {todo, priority, date} = propsList[i];
    list.push(
      <ListItem 
        todo={todo} 
        priority={priority} 
        date={date} 
        key={`item${i}`}
        id={`item${i}`}
        handleDelete={props.handleDelete}
      />
    )
  }

  return (
    <div className='listBox'>
      <div className='listTitle'>
        <h3>To-Do's to do: </h3>
      </div>
      <ol className='todoList'>
        {list}
      </ol>
    </div>
  )
}


export default ListDisplay;