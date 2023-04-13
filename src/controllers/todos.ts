import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.floor(Math.random() * 100).toString(), text);
  TODOS.push(newTodo);

  res.json({ message: "Created new Todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ message: "Todos list", todosList: TODOS });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const todoId = (req.params as { id: string }).id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("could not find todo");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: "Updated todo", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = (req.params as { id: string }).id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("could not find todo");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Deleted todo" });
};
