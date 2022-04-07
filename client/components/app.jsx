import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import ListDisplay from '../containers/listDisplay.jsx';
import ItemCreator from '../containers/itemCreator.jsx';

const App = (props) => {


  const [listItem, setListItem] = useState('');
  const [priority, setPriority] = useState('');
  const [itemList, setItemList] = useState([]);
  const [points, setPoints] = useState(0);

  // EQUIVALENT TO COMPONENTDIDMOUNT()
  useEffect(() => {
    fetchData();
  },[])

  async function fetchData(){
    const response = await(fetch('/update'));
    const list = await response.json();
    setItemList(list)
  }
  // //PROMISE SYNTAX
  // function fetchData () {
  //   console.log('going to fetch');
  //   fetch('/update')
  //   .then(response => {
  //     // console.log('this is the response', response)
  //     return response.json();
  //   })
  //   .then(list => {
  //     // console.log('this is the list of todos:', list);
  //     setItemList(list);
  //   }).catch(err => {
  //     console.log('There was an error retreiving the to-do list: ', err);
  //   })
  // }

  async function handleSubmit(e){
    e.preventDefault();
    const response = await fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listItem: listItem,
        priority: priority
      })
    });
    const list = await response.json();
    setItemList(list);
  }

  

  return (
    <div id='app'>
        
      <h1>THE HANDY DANDY TO-DO LIST!</h1>

      <ItemCreator 
        text={listItem} 
        handleSubmit={handleSubmit} 
        handleChangeListItem={setListItem}
        handleChangePriority={setPriority}
        points={points}
      />

      <ListDisplay 
        // handleDelete={this.handleDelete} 
        list={itemList}
      />

    </div>
  )
}


//   /*
//   ****** THIS PROVIDES FUNCTIONALITY THAT ALLOWS USER TO REMOVE A TO-DO ITEM *******
//   NOTE: THIS WILL WORK TO DELETE THE ITEM FROM THE DATABASE
//   */
//   handleDelete(id, priority){
//     // console.log('this one needs to be deleted: ', id);
//     // this will provide details of the point system and 
//     const pointSystem = {
//       "High": 5,
//       "Moderate": 3,
//       "Low": 1
//     };
//     this.setState((prevState) =>({
//       points: prevState.points + pointSystem[priority]
//     }))



export default App;