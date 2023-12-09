import React, {useEffect, useState} from 'react';
import "./styles.css"

const App = () => {
  const[newItem, setNewItem]=useState("")
  const[toDos, setToDos]=useState(() => {
    if(localStorage.getItem("ITEMS") == null){
      return [];
    }
    return JSON.parse(localStorage.getItem("ITEMS"));
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDos));
  }, [toDos])

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("")
  };

  const handleChange=(e)=>{
    setNewItem(e.target.value)
  }

  const handleDelete = (each) => () => {
   let todoClone = [...toDos]
   todoClone = todoClone.filter((item) =>(item.id!==each.id))
   setToDos([...todoClone])
  }

  const handleCompleted = (each) => (e) => {
    let todoClone = [...toDos]
    todoClone = todoClone.map((item) =>{
      if(item.id==each.id)
      {
        item.completed = e.target.checked
      }
      return item
    })
    setToDos([...todoClone])
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input  value={newItem} onChange={handleChange} type="text" id="item"></input>
    </div>
    <button className='btn' >Add</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className='list'>
      {toDos.map(each => {
        return(
          <li>
            <label>
            <input type='checkbox' onChange={handleCompleted(each)}></input>
            {each.completed?<span style={{textDecoration:'line-through'}}></span>:each.title}
            </label>
            <button className='btn btn-danger' onClick={handleDelete(each)}>Delete</button>
          </li>
        )
      })
      }
    </ul>
    </>
  )
}

export default App
