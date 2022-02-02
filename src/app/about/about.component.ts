import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent {
    animal: string = "";
    constructor(private dialog: MatDialog) {

    }

    addTag() {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '1000px',
            data: { animal: this.animal },
        });

        dialogRef.afterClosed().subscribe(e => {

        })
    }
}