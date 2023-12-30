import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  name: string = '';
  constructor(public dialogRef: MatDialogRef<CategoryAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
    }
  }

  saveCategory() {
    this.dialogRef.close(this.name)
  }
}
