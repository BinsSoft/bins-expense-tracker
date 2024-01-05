import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  name: string = '';
  isRepeat: boolean = false;
  repeatDate: number = 0;
  constructor(public dialogRef: MatDialogRef<CategoryAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      if (this.data.repeatDate && this.data.repeatDate != 0) {
        this.isRepeat = true;
      }
      this.repeatDate = this.data.repeatDate;

    }
  }

  saveCategory() {
    this.dialogRef.close({
      name: this.name,
      isRepeat: this.isRepeat,
      repeatDate: this.repeatDate
    })
  }
}
