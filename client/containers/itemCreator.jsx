import React from 'react';
import { render } from 'react-dom';

const ItemCreator = (props) => {
  
  return (
    <div className='itemCreator'>
      <form onSubmit={((e) => props.handleSubmit(e))}>
      <label>To Do: </label>
      <input type='text' value={props.text} onChange={((e) => props.handleChange(e))} required/>
      
      <label>
        Priority Level: 
        <select onChange={((e) => props.handleChange(e))}>
          <option value='null'>Select One</option>
          <option value='High'>High</option>
          <option value='Moderate'>Moderate</option>
          <option value='Low'>Low</option>
        </select>
      </label>
      <input type='submit' value='Add'/>
      </form>

      <div className="pointsBox">
        Points: {props.points}
      </div>
    </div>
  );
}


export default ItemCreator;