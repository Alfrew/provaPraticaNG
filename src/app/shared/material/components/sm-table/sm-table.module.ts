import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CdkTableModule } from "@angular/cdk/table";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SmTableComponent } from "./sm-table/sm-table.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SmTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    CdkTableModule,
    DragDropModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [SmTableComponent],
})
export class SmTableModule {}
