import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';
Todolist.propTypes = {
    todos: PropTypes.array.isRequired,
    onTodoClick: PropTypes.func
};

function Todolist(props) {
    const {todos, onTodoClick} = props;
    function handleCLick(todo){
        if(onTodoClick){
           onTodoClick(todo);
        }
    }
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <li key={todo.id}
                    onClick={() => handleCLick(todo)}
                >{todo.title}</li>
            ))}
        </div>
    );
}

export default Todolist;