import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Note = { id: number; title: string; content: string };
type Task = { id: number; text: string; done: boolean };
type Todo = { id: number; title: string; tasks: Task[] };

const initialNotes: Note[] = [
  { id: 1, title: 'Shopping List', content: 'Buy milk and bread' },
  { id: 2, title: 'Ideas', content: 'Start a blog about travel' },
];

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Work Tasks',
    tasks: [
      { id: 1, text: 'Finish report', done: false },
      { id: 2, text: 'Email client', done: true },
    ],
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notes: Note[] = [...initialNotes];
  todos: Todo[] = JSON.parse(JSON.stringify(initialTodos));
  search = '';

  newNoteTitle = '';
  newNoteContent = '';

  newTodoTitle = '';
  newTodoTaskText = '';
  newTodoTasks: Task[] = [];

  nextNoteId = this.notes.length + 1;
  nextTodoId = this.todos.length + 1;
  nextTaskId = 1;

  get filteredNotes(): Note[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.notes;
    return this.notes.filter((n) => n.title.toLowerCase().includes(q));
  }

  get filteredTodos(): Todo[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.todos;
    return this.todos.filter((t) => t.title.toLowerCase().includes(q));
  }

  addNote() {
    if (!this.newNoteTitle.trim()) return;
    this.notes.unshift({
      id: this.nextNoteId++,
      title: this.newNoteTitle.trim(),
      content: this.newNoteContent.trim(),
    });
    this.newNoteTitle = '';
    this.newNoteContent = '';
  }

  addTaskToBuffer() {
    const text = this.newTodoTaskText.trim();
    if (!text) return;
    this.newTodoTasks.push({ id: this.nextTaskId++, text, done: false });
    this.newTodoTaskText = '';
  }

  removeBufferedTask(idx: number) {
    this.newTodoTasks.splice(idx, 1);
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    const tasksCopy = this.newTodoTasks.map((t) => ({ ...t }));
    this.todos.unshift({
      id: this.nextTodoId++,
      title: this.newTodoTitle.trim(),
      tasks: tasksCopy,
    });
    this.newTodoTitle = '';
    this.newTodoTasks = [];
  }

  toggleTask(todo: Todo, task: Task) {
    task.done = !task.done;
  }

  noteColorClass(i: number) {
    const colors = ['c1', 'c2', 'c3', 'c4'];
    return colors[i % colors.length];
  }
}
