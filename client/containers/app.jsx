import React, {useState, useEffect} from 'react';
import ListDisplay from './listDisplay.jsx';
import ItemCreator from '../components/itemCreator.jsx';
import Header from './header.jsx';

//Container that houses the Header, ItemCreator, and ListDisplay components
//Also handles logic for retrieving list from database if user is initialized from Index component
//List will be sent down via props to the ListDisplay component
//Also handles submit logic from the ItemCreator and handles delete logic for ListDisplay
const App = (props) => {
  //Using React Hooks to control state
  const [listItem, setListItem] = useState('');
  const [priority, setPriority] = useState('');
  const [itemList, setItemList] = useState([]);
  /* To add additional functionality that would keep track of points to improve motivation to complete tasks */
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
        setItemList(list)
      }
    }
    catch(err) {
      console.log('there was an error retrieving data from database! ', err);
    }
  }

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

  /*
  TODO: Need to figure out logic to delete a list item
  */
  async function handleDelete(todo, priority){
    /* To add additional functionality that would keep track of points to improve motivation to complete tasks */
    // const pointSystem = {
    //   "High": 5,
    //   "Moderate": 3,
    //   "Low": 1
    // };
    // setPoints (points + pointSystem[priority]);

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
    setItemList(list);
  }

    /*
  TODO: Need to figure out logic to edit an item
  */

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