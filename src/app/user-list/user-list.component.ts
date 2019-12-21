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
    filteredUsers: Array<User> = undefined;
    removedUsers: Array<string> = undefined;

    constructor(
        private userService: UserServiceService
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    // ------- Controller ------

    getUsers() {
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
                    console.log("pushed: " + user);
                });
            }

            this.syncUsers();
        });
    }

    syncUsers() {
        // remove already deleted user
        let removedUser = localStorage.getItem("removedUser");
        if (removedUser) {
            this.removedUsers = JSON.parse(removedUser);
            this.updateUsers(this.removedUsers);
        }

        // sync filtered to users
        this.filteredUsers = new Array<User>(...this.users);
    }

    updateUsers(userIds: Array<string>): void {
        userIds.forEach(id => {
            for (let i = 0; i < this.users.length; i++)
                if (this.users[i].Id === id) {
                    this.users.splice(i, 1);
                    break;
                }
        });
    }

    // ------- View -------

    onKeyStroke(event: any) {
        // make case insensitive
        const search: string = (event.target.value as string).toLowerCase();

        // clear filtered and search for results
        this.filteredUsers.splice(0, this.filteredUsers.length);
        this.users.forEach(user => {
            // concat name and second to perform a single search
            const fullName = (user.FirstName + " " + user.SecondName).toLowerCase();

            if (fullName.includes(search))
                this.filteredUsers.push(user);
        });
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    // ------- Child Event -------

    deleteUser(userId: string) {
        // for users
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].Id === userId)
                this.users.splice(i, 1);
        }
        // also update current filtered users without reloading all users
        for (let i = 0; i < this.filteredUsers.length; i++) {
            if (this.filteredUsers[i].Id === userId)
                this.filteredUsers.splice(i, 1);
        }
        // update removed user and store it
        if (!this.removedUsers) this.removedUsers = new Array<string>();
        this.removedUsers.push(userId);
        localStorage.setItem("removedUser", JSON.stringify(this.removedUsers));
    }
}
