import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service/user-service.service';
import { User } from '../user/user';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    users: Array<User> = undefined;

    constructor(
        private userService: UserServiceService
    ) { }

    ngOnInit() {
        this.userService.getJSON().subscribe(data => {
            if (data !== undefined) {
                data.forEach(d => {
                    let user: User = {
                        FirstName: d.FirstName,
                        SecondName: d.SecondName,
                        Position: d.Position,
                        Id: d.Id,
                        Details: d.Details,
                        Blocked: d.Blocked,
                    };

                    if (this.users === undefined) this.users = new Array<User>();

                    this.users.push(user);
                });
            }
        });

    }

}
