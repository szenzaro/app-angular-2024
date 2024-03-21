import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private lists = signal<ListData[]>([
    { id: '1', label: 'HTML', todos: [] },
    { id: '2', label: 'CSS', todos: [] },
    {
      id: '3', label: 'Esame Saw', todos: [
        { id: '1', label: 'Concordare il progetto', state: 'done' },
        { id: '2', label: 'Sviluppare il progetto', state: 'tbd' },
        { id: '3', label: 'Consegnare il progetto', state: 'tbd' },
        { id: '4', label: 'Sostenere esame', state: 'tbd' },
      ]
    },
    {
      id: '4', label: 'Git', todos: [
        { id: '1', label: 'git add', state: 'done' },
        { id: '2', label: 'git commit', state: 'done' },
        { id: '3', label: 'git push', state: 'tbd' },
        { id: '4', label: 'leave building', state: 'tbd' },
      ]
    },
  ]);

  dblists = computed(() => this.lists());

  getList(id: string) {
    return this.lists().find((l) => l.id === id);
  }

  getTodos(listId: string) {
    return this.getList(listId)?.todos ?? [];
  }

  addList(label: string) {
    const l: ListData = {
      id: window.crypto.randomUUID(),
      label,
      todos: [],
    }
    this.lists.set([...this.lists(), l]);
  }

  addTodo(listId: string, label: string) {
    const todo: TodoData = {
      id: window.crypto.randomUUID(),
      label,
      state: 'tbd',
    }

    this.lists.set(this.lists().map(l => l.id === listId
      ? { ...l, todos: [...l.todos, todo] }
      : l));
  }

  deleteList(id: string) {
    this.lists.set(this.lists().filter((l) => l.id !== id));
  }

  deleteTodo(idList: string, id: string) {
    this.lists.set(this.lists().map(l => l.id === idList
      ? { ...l, todos: l.todos.filter(t => t.id !== id) }
      : l));
  }

  editList(id: string, label: string) {
    this.lists.set(this.lists().map((l) => l.id === id
      ? { ...l, label }
      : l));
  }

  editTodo(idList: string, id: string, todo: Partial<TodoData>) {
    this.lists.set(this.lists().map(l => l.id === idList
      ? ({ ...l, todos: l.todos.map(t => t.id === id ? ({ ...t, ...todo }) : t) })
      : l));
  }
}

export interface TodoData {
  id: string;
  label: string;
  state: 'done' | 'tbd';
}

export interface ListData {
  id: string;
  label: string;
  todos: TodoData[]
}