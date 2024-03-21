import { Component, computed, inject, input } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.css'
})
export class TodosPageComponent {
  db = inject(DbService);
  router = inject(Router);
  
  id = input.required<string>();

  todos = computed(() => this.db.getTodos(this.id()));
}
