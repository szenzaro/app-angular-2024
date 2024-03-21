import { Component, inject } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { DbService } from '../../services/db.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListComponent, ReactiveFormsModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {
  db = inject(DbService);

  text = new FormControl('', Validators.required);

  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.text.valid) {
      // crea lista
      this.db.addList(this.text.value!);
      this.text.setValue('');
      return;
    }

    if (e.key === 'Escape') {
      this.text.setValue('');
    }
  }
}
