import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { UserSearchComponent } from './user-search/user-search.component';

const routes: Routes = [
  { path: 'allUsers', component: UserListComponent },
  { path: 'addUser', component: AddUserFormComponent },
  { path: 'user/:id', component: EditUserFormComponent },
  { path: 'delete/user/:id' , component: UserListComponent },
  { path: 'users' , component: UserSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
