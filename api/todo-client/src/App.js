/*
1) 일정 입력하고 추가시키기 (get, post)
2) 일정 옆에 체크박스 만들기 
3) 생성한 일정 삭제하기 (delete)
4) 투두리스트 css 꾸미기 (날짜, 플렉스박스)
*/

import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); 
  // todo-list 상태 관리하기(초기 빈 배열로 설정) => todos: 현재 todo-list의 상태, setTodo: todo-list 업데이트
  const [newTodo, setInput] = useState('');
  // todo-list 입력 상태 관리하기(입력 필드 비어있음) => newTodos: 입력 필드 값, setInput: 입력 필드 상태 변경

  const getTodos = async () => {
    const response = await axios.get('/api/todos'); // 저장된 todo-list 데이터 가져오기
    setTodos(response.data.todos); // 새로운 todo 업데이트하기
  };

  const postTodos = async(e) => {
    e.preventDefault();

    if(newTodo === "") return; // 입력 값이 비어있으면 return
    
    const formData = new FormData();

    formData.append('todoData', newTodo); // formData 객체에 사용자가 입력한 값을 makeTodo라는 이름으로 추가
    const response = await axios.post('/api/todos', formData); // formData 객체를 업로드

    setTodos((prev) => [...prev, response.data]); // 이전의 todo-list 가져와서 response.data 추가해서 확장시키기

    setInput(""); // 다시 비워주기
  };

  const deleteTodos = async(id) => {
    await axios.delete(`/api/todos/${id}`); // 특정 id값을 가진 데이터 삭제 요청
    const arrangeTodos = todos.filter((todo) => todo.id !== id); // 현재 todo-list에서 특정 id 값을 가지지 않는 데이터들만 모아서 새로운 todo-list 생성
    setTodos(arrangeTodos); // 새로운 todo-list로 업데이트
  };

  const checkedTodo = async(id) => {
    const response = await axios.put(`/api/todos/${id}`); // 특정 id값을 가진 일정이 완료됐다고 넣어주기
    const checked = todos.map((todo) => todo.id === id? response.data : todo);
    // map 메소드 : 각 todo들을 조건에 해당하는지 검사 => todo-list의 각 todo가 특정 id값에 해당하면 위에서 받은 response.data로 교체, 해당안하면 그대로
    setTodos(checked); // 새로운 todo-list 생성
  }

  const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();  
    return(`${year}-${month}-${date}`);
  }
  

  useEffect(() => {
    getTodos();
  }, []); // 두번째 파라미터로 빈 배열을 줬으므로 마운트될 때만 실행

  return( // 생성버튼, 삭제버튼, checkbox 만들기
    <div className = 'todoListBox'>
      <div className ='todoList'>TODO LIST<br/></div>
      <div className ='today'>{todayDate()}</div>
      <br />
      <form onSubmit = {postTodos}>
        <div className='inputTodo'>
          <input type= 'text' value= {newTodo} onChange={(e) => setInput(e.currentTarget.value)}></input>
          <button onClick={postTodos}>생성</button>
        </div>
      </form>

      <ul className = 'todoListItem'>
        {todos.map((todo) => (
          <li key={todo.id} className='todoItem'>
            <input type = 'checkbox' checked={todo.done} onChange={() => checkedTodo(todo.id)}></input>
            
            <span>{todo.thumbnail}</span> 
            <span>{todo.title}</span>
            <button onClick={()=>deleteTodos(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;