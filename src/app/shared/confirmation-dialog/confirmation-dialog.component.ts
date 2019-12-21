import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {

    @Input() id: string;

    private element: any;

    constructor(
        private dialogService: ConfirmationDialogService,
        private el: ElementRef
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        let dialog = this;

        // append to end of body to be visible
        document.body.appendChild(this.element);

        // close dialog on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'Dialog')
                dialog.closeDialog();
        });

        this.dialogService.add(this);
    }

    ngOnDestroy() {
        this.dialogService.remove(this.id);
        this.element.remove();
    }


    openDialog() {
        this.element.style.display = 'block';
        document.body.classList.add('dialog-open');
    }

    closeDialog() {
        this.element.style.display = 'none';
        document.body.classList.remove('dialog-open');
    }
}
