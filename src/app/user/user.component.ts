import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    @Input() user: User;

    @Output() edit = new EventEmitter<string>();
    @Output() delete = new EventEmitter<string>();


    constructor() {
    }

    ngOnInit() {
    }


    onEditButtonClick() {
        this.edit.emit(this.user.Id);
    }

    onDeleteButtonClick() {
        this.delete.emit(this.user.Id);
    }
}
