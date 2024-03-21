import { Component, inject, input } from '@angular/core';
import { EditIconComponent } from '../edit-icon/edit-icon.component';
import { DeleteIconComponent } from '../delete-icon/delete-icon.component';
import { RightArrowIconComponent } from '../right-arrow-icon/right-arrow-icon.component';
import { DbService, ListData } from '../../services/db.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [EditIconComponent, RightArrowIconComponent, DeleteIconComponent, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  list = input.required<ListData>();

  db = inject(DbService);
  router = inject(Router);

  editing = false;
  text = new FormControl('', Validators.required);

  goEditmode() {
    this.editing = true;
    this.text.setValue(this.list().label)
  }

  deleteList() {
    this.db.deleteList(this.list().id);
  }

  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.text.valid) {
      this.db.editList(this.list().id, this.text.value!);
      this.editing = false;
    }

    if (e.key === 'Escape') {
      this.editing = false;
    }
  }
}
