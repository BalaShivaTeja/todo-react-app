import React, {useState, useEffect} from 'react';

function App(){
  const [tasks, setTasks] = useState(()=> JSON.parse(localStorage.getItem('tasks')||'[]'));
  const [text, setText] = useState('');

  useEffect(()=> localStorage.setItem('tasks', JSON.stringify(tasks)), [tasks]);

  function addTask(){
    if (!text.trim()) return;
    setTasks([...tasks, {id: Date.now(), text, done: false}]);
    setText('');
  }

  function toggle(id){
    setTasks(tasks.map(t => t.id===id ? {...t, done: !t.done} : t));
  }

  function remove(id){
    setTasks(tasks.filter(t => t.id!==id));
  }

  return (
    <div style={{padding:20}}>
      <h1>To-Do</h1>
      <input value={text} onChange={e =>setText(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
      {tasks.map(t=>(
        <li key={t.id}>
          <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
          <span style={{textDecoration: t.done?'line-through':'none'}}>{t.text}</span>
          <button onClick={()=>remove(t.id)}>Del</button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
