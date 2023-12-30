import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  name: string = '';
  constructor(public dialogRef: MatDialogRef<UsersAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
    }
  }

  saveUser() {
    this.dialogRef.close(this.name)
  }

}
