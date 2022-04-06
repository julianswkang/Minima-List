import React from 'react';
import { render } from 'react-dom';

const ItemCreator = (props) => {
  
  return (
    <div className='itemCreator'>
      <div className='form'>
        <form onSubmit={((e) => props.handleSubmit(e))}>
        <label>To Do: </label>
        <input id='formText' type='text' value={props.text} onChange={((e) => props.handleChange(e))} required/>
        <label>
          Priority Level: 
          <select onChange={((e) => props.handleChange(e))}>
            <option>Select One</option>
            <option value='High'>High</option>
            <option value='Moderate'>Moderate</option>
            <option value='Low'>Low</option>
          </select>
        </label>
        <input type='submit' value='Add' id="addButton"/>
        </form>
      </div>
  
      <div className="pointsBox">
        Points: {props.points}
      </div>
    </div>
  );
}


export default ItemCreator;