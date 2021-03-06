import React from 'react';

//provides the interface to create a list item 
//props={handleSubmit(), handleChangeListItem(), handleChangePriority()}
const ItemCreator = (props) => {
  
  return (
    <div className='itemCreator'>
      <div className='form'>
        <form onSubmit={((e) => props.handleSubmit(e))}>
        <label>To Do: </label>
        <input id='formText' type='text' value={props.text} onChange={(e) => props.handleChangeListItem(e.target.value)} required/>
        
        <label>
          Priority Level: 
          <select onChange={((e) => props.handleChangePriority(e.target.value))}>
            <option>Select One</option>
            <option value='High'>High</option>
            <option value='Moderate'>Moderate</option>
            <option value='Low'>Low</option>
          </select>
        </label>
        <input type='submit' value='Add' id="addButton"/>
        </form>
      </div>
  
      {/* To add additional functionality that would keep track of points to improve motivation to complete tasks */}
      {/* <div className="pointsBox">
        <div>
          Points: {props.points}
        </div>
        <div>
          <button className='usepoints'>Use points!</button>
        </div>
      </div> */}
      
    </div>
  );
}


export default ItemCreator;