import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent {
    constructor(private dialog: MatDialog) {
    }

    addPost() {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '1000px',
        });

        dialogRef.afterClosed().subscribe(e => {
        })
    }
}