import React from 'react';
import { render } from 'react-dom';



const listItem = (props) => (
  
<li>
  <div className='listItem'>

    <div className='todo'>
      {props.todo}
    </div>

    <div className='priority'>
      {props.priority}
    </div>

    <div className='editButton'>
      <button>Edit</button>
    </div>

    <div className='deleteButton'>
      <button>Delete</button>
    </div>

  </div>
</li>
);



export default listItem;