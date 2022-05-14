import React from 'react';



//List item component that represents each item created by end-user 
//props = {todo, priority, handleDelete()}
const ListItem = (props) => (
<li>
  <div className='listItem'>
    <div className='todo'>{props.todo}</div>
    <div className='priority'>{props.priority}</div>
    {/* To add functionality to delete items that are not completed */}
    {/* <div className='editButton'>
      <button>Edit</button>
    </div> */}

    <div className='deleteButton'>
      <button onClick={() => props.handleDelete(props.todo, props.priority)}>Finished</button>
    </div>
  </div>
</li>
);



export default ListItem;