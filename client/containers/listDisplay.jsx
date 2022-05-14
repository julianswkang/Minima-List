import React from 'react';
import ListItem from '../components/listItem.jsx'

//Display the list provided by App component
//props = {list, handleDelete()}
const ListDisplay = (props) => {
  let listLength = props.list.length;
  let propsList = props.list;

  const list = [];
  //iterate through the list and individually create a ListItem component
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
        <h3>Tasks to accomplish!</h3>
      </div>
      <ol className='todoList'>
        {list}
      </ol>
    </div>
  )
}


export default ListDisplay;