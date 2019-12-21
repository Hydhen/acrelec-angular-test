import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';



@NgModule({
    imports: [CommonModule],
    declarations: [ConfirmationDialogComponent],
    exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule { }
