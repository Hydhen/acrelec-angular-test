import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { ConfirmationDialogService } from '../shared/confirmation-dialog.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

    @Input() user: User;

    @Output() edit = new EventEmitter<string>();
    @Output() delete = new EventEmitter<string>();


    constructor(
        private dialogService: ConfirmationDialogService
    ) {
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
