import './App.scss';

import queryString from 'query-string';
import { useEffect, useState } from 'react';

import ColorBox from './components/colorBox';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import Todolist from './components/Todolist';
import PostFiltersForm from './components/PostFilters';
import Clock from './components/Clock';

function App() {
  const [todoList,setTodo] = useState([
    {id:1,title: 'aaaaaaaaaaa'},
    {id:2, title: 'bbbbbbbbbb'},
    {id:3,title:'ccccccccc'}
  ]);
  
  function handleTodoCLick(todo){
     console.log(todo);
     const index = todoList.findIndex(x => x.id === todo.id);
     console.log(index);
     if(index <0) return;
     const newTodolist = [...todoList];
     newTodolist.splice(index,1);
     setTodo(newTodolist);
  }
  function handleTodoFormSubmit (formValue){
    const newTodo = {
      id: todoList.length + 1,
      ...formValue
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodo(newTodoList);
      
  }
  const [postList,setPostlist] = useState([]);


  const [pagination,setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
 });

  
  const [filters,setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  });
  useEffect(() =>{
   async function fetchPostList() {
     try {
        const paramString = queryString.stringify(filters);
        //const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const {data,pagination} = responseJSON;
        setPostlist(data);
        setPagination(pagination);
     } catch (error) {
       console.log('Faile to fetch post list', error.message);
     }
    
   }
   fetchPostList();
  },[filters]);

  function handlePageChange(newPage){
   console.log('New page' ,newPage);
   setFilters({...filters, _page: newPage})
  }

  function handleFiltersChange(newFilters){
     setFilters({...filters, _page: 1, title_like: newFilters.searchTerm})
  }

const[showClock,setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>Welcome to reactjs Hooks!</h1>
     
      {showClock &&<Clock />}
      <button onClick={() => setShowClock()}>Hide clock</button>
 
      <PostList posts={postList}/>
      <TodoForm onSubmit={handleTodoFormSubmit}/>

      <PostFiltersForm onSubmit={handleFiltersChange}/>

      <Todolist todos={todoList}
         onTodoClick={handleTodoCLick}
      />
      <Pagination pagination={pagination}
        onPageChange={handlePageChange}
      />
      <ColorBox/>
    </div>
  );
}

export default App;
