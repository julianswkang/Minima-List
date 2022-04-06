import React from 'react';
import { render } from 'react-dom';
import ListDisplay from '../containers/listDisplay.jsx';
import ItemCreator from '../containers/itemCreator.jsx';



class App extends React.Component{

  render(){
    return(
      <div id='app'>
        <h1>THE HANDY DANDY TO-DO LIST!</h1>
        <ItemCreator />
        {/* <ListDisplay /> */}
      </div>
    )
  }

}

export default App;