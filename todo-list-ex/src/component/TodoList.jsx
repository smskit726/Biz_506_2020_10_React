import React, { Component } from "react";
import TodoItem from "./TodoItem";
import "../css/TodoList.css";

class TodoList extends Component {
  render() {
    const { todoList, onToggle, onDeleteItem } = this.props;
    const viewTodoList = todoList.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDeleteItem={onDeleteItem}
        />
      );
    });
    return (
      <div className="todo-list">
        <div>{viewTodoList}</div>
      </div>
    );
  }
}

export default TodoList;
