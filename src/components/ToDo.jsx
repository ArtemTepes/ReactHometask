import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

export const ToDo = () => {
  let date = new Date().getDay() + '.' + new Date().getMonth() + '.'  + new Date().getFullYear() + ' - ' + new Date().getHours() + ':' + new Date().getMinutes()
  const [todos, setTodos] = useState([
    {id: 1, title: 'Bismark', desc : 'Chad battleship', checked: false, time : date},
    {id: 2, title: 'Hood', desc : 'Virgin battleship', checked: false, time : date}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck} 
            time={todo.time}
          />) }
      </ul>
    )
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);


    if (index !== -1) {
      const todo = todos[index];
    
      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);
      
      setTodos([...todos]);
    }

    
  }

  const onSubmit = (title, desc, time) => {

    const todo = {
      title,
      desc,
      id: idCount,
      checked: false,
      time
    };

    setTodos([...todos, todo]);
    setIdCount(idCount + 1);
  } 

  const removeChecked = () => { 
    
    let i = todos.length;
    while (i--) {
      if (todos[i].checked === true) {
          todos.splice(i, 1);
      }
    }
    
    setTodos([...todos]);
  }



  const numberOfUnChecked = () => { 

    let count = 0;

    let i = todos.length;
    while (i--) {
      if (todos[i].checked === false) {
          count++;
      }
    }

    return count;
  }


  return (
    <Card title={'List of battleships'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      { renderTodoItems(todos) }
      <Divider />
      <p>Number of Unchecked cards: <p className="todo-numberUnchecked">{numberOfUnChecked()}</p></p>
      <Divider />
      <Button danger = "true" htmlType="submit" type="primary" onClick={removeChecked}>Remove checked cards</Button>
    </Card>
  );
}
