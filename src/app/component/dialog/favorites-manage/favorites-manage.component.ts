import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-favorites-manage',
  templateUrl: './favorites-manage.component.html',
  styleUrls: ['./favorites-manage.component.scss']
})
export class FavoritesManageComponent implements OnInit {

  favName: any = '';
  constructor(
    public dialogRef: MatDialogRef<FavoritesManageComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.favName = this.data.item.c;
  }

  ngOnInit(): void {
  }

  saveFavItem() {
    if (this.favName) {
      this.dialogRef.close(this.favName);
    }
  }

}
