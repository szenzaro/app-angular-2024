import { Component, Input, input } from '@angular/core';
import { TodoData } from '../../services/db.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todo = input.required<TodoData>();

  
}
