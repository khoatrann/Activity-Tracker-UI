import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent {
    selected: Date | any;
    constructor( private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data: string,public postsService: PostsService) {
    }
    submit(form: NgForm){
        if (form.invalid) {
            return;
          }
          this.postsService.addPost(form.value.title,form.value.subtitle, form.value.content, form.value.link);
          console.log("from form input, subtitle is:" + form.value.subtitle)
          form.resetForm();
        this.dialogRef.close();
    }
}