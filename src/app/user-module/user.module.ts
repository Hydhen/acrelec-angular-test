import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';


const routes: Routes = [
    { path: '', component: UserListComponent }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [UserListComponent, UserComponent]
})
export class UserModule { }
