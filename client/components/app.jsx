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

  // EQUIVALENT TO COMPONENTDIDMOUNT()
  useEffect(() => {
    if (props.user !== ''){
      fetchData(props.user);
    }
  },[])

  //WILL NEED TO RETURN USER AND LIST INFORMATION WITH EACH FETCH
  async function fetchData(user){
    console.log('user is: ', user);
    try{
      const response = await fetch('/update/getList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user
        })
      });
      if (response.status === 200){
        const list = await response.json();
        console.log('this is the list: ', list);
        setItemList(list)
      }
      
      
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
    try{
      const response = await fetch('/update/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: props.user,
          listItem: listItem,
          priority: priority
        })
      });
      if (response.status === 200){
        const list = await response.json();
        setItemList(list);
        setListItem('');
        setPriority('');
      }
    }
    catch(err){
      console.log('There was an error adding an item')
    }
    
  }

  async function handleDelete(todo, priority){
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
        todo,
        username: props.user
      })
    });
    const list = await response.json();
    //console.log(list.list);
    setItemList(list);
  }

  return (
    <div id='app'>
      <Header />
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