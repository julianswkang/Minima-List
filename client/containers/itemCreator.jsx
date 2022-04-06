import React from 'react';
import { render } from 'react-dom';

class ItemCreator extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
     <div className='itemCreator'>
       <form onSubmit={((e) => this.props.handleSubmit(e))}>
        <label>To Do: </label>
        <input type='text' onChange={((e) => this.props.handleChange(e))} required/>
        
        <label>
          Priority Level: 
          <select onChange={((e) => this.props.handleChange(e))}>
            <option value='null'>Select One</option>
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