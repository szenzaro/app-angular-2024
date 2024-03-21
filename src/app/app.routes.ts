import { Routes } from '@angular/router';
import { ListPageComponent } from './components/list-page/list-page.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    { path: 'lists', component: ListPageComponent },
    { path: 'lists/:id', component: TodosPageComponent },
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: '**', component: ErrorPageComponent },
];
