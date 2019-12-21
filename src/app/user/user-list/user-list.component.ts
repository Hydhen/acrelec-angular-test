import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    constructor(
        private userService: UserServiceService
    ) { }

    ngOnInit() {
        this.userService.getJSON().subscribe(data => {
            console.log(data);
        });
    }

}
