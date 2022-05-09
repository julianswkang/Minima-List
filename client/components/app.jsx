import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import ListDisplay from '../containers/listDisplay.jsx';
import ItemCreator from '../containers/itemCreator.jsx';
import Header from '../containers/header.jsx';

const App = (props) => {

  const [listItem, setListItem] = useState('');
  const [priority, setPriority] = useState('');
  const [itemList, setItemList] = useState([]);
  const [points, setPoints] = useState(0);
  // const [user, setUser] = useState('');

  // EQUIVALENT TO COMPONENTDIDMOUNT()
  useEffect(() => {
    if (props.user){
      //setUser(props.user);
      console.log("There is a user!");
      fetchData(props.user);
    }
  },[])

  async function fetchData(user){
    try{
      const response = await(fetch('/update/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user
        })
      }));
    const list = await response.json();
    setItemList(list)
    }
    catch(err) {
      console.log('there was an error retrieving data from database! ', err);
    }
  }

  // async function getDogFact(){
  //   console.log('CALLING DOG API')
  //   const response = await fetch ('/dogfact');
  //   console.log('response is: ', response);
    
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
    setListItem('');
    setPriority('');
  }

  async function handleDelete(id, priority){
    const pointSystem = {
      "High": 5,
      "Moderate": 3,
      "Low": 1
    };
    setPoints (points + pointSystem[priority]);

    const response = await fetch('/update', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    });
    const list = await response.json();
    setItemList(list);
  }

  return (
    <div id='app'>
      <Header 
        handleSetUser={props.handleSetUser}
      />
      <h1>MINIMA-LIST</h1>
      <ItemCreator 
        text={listItem} 
        handleSubmit={handleSubmit} 
        handleChangeListItem={setListItem}
        handleChangePriority={setPriority}
        points={points}
      />
      <ListDisplay 
        handleDelete={handleDelete} 
        list={itemList}
      />
    </div>
  )
}

export default App;