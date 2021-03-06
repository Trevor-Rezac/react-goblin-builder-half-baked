import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
import { useState } from 'react';

function App() {
  /* 
    track: 
      allGoblins, an array of all goblins
      filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/
  const [goblinFormName, setGoblinFormName] = useState('Goober');
  const [goblinFormHP, setGoblinFormHP] = useState('');
  const [goblinFormColor, setGoblinFormColor] = useState('lightgreen');
  const [allGoblins, setAllGoblins] = useState([]);
  const [filteredGoblins, setFilteredGoblins] = useState([]);

  // console.log('||', goblinFormName, goblinFormHP, goblinFormColor);
  // console.log('||', allGoblins, filteredGoblins);
  
  function submitGoblin(e) {
    e.preventDefault();
    
    // on submit, make a new goblin object with a random id, a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    const goblin = {
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor,
      id: Math.floor(Math.random() * 1000)
    };

    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, goblin]);
    
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP('');
    setGoblinFormColor('lightgreen');

  }

  function handleDeleteGoblin(id) {
    // find the index of the goblin in allGoblins with this id
    const index = allGoblins.findIndex(goblin => goblin.id === id);
    // use splice to delete the goblin object at this index
    allGoblins.splice(index, 1);
    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);
  }

  function handleFilterGoblins(search) {
    // use the filter method to get an array of goblins whose name includes this search argument
    const filteredGoblins = allGoblins.filter(goblin => goblin.name.includes(search));
    // if there is a search argument, set the filtered goblins to the filtered goblins
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins
    
    // setFilteredGoblins(filteredGoblins);
    if (search) {
      setFilteredGoblins(filteredGoblins);
    } else {
      setFilteredGoblins([]);
    }
  }


  return (
    <div className="App">
      <div className='current-goblin quarter'>
        { goblinFormName && <Goblin goblin={{
        /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor
          
        
        }}/>}
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>
      <GoblinForm 
        // This component takes in a ton of props! 
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName} 
        setGoblinFormName={setGoblinFormName}
        goblinFormColor={goblinFormColor} 
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP={goblinFormHP}
        setGoblinFormHP={setGoblinFormHP}
      />
      <GoblinList 
        goblins={filteredGoblins.length ? filteredGoblins : allGoblins} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
