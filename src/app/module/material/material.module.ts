import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule
]
@NgModule({
  declarations: [],
  imports: MaterialComponents,
  exports:MaterialComponents
})
export class MaterialModule { }
