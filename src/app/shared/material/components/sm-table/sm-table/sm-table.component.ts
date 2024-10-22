import { Component, Input, Output, EventEmitter, AfterViewChecked, ViewChild, OnChanges, ContentChild, TemplateRef } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { animate, state, style, transition, trigger } from "@angular/animations";

export interface IconAction {
  actionName: string;
  icon: string;
  tooltip: string;
  visible?: (element?: any) => boolean;
}

export interface Column {
  columnDef: string;
  header: string;
  sortProperty?: string;
  type?: "label" | "link" | "status" | "action" | "checkbox" | "custom" | "expand";
  isSortable?: boolean;
  isSticky?: boolean;
  icons?: IconAction[];
  url?: string;
  isHidden?: boolean;
  textAlign?: "center" | "left" | "right";
  checkboxAll?: boolean;
}
export interface SubTableColumn {
  columnDef: string;
  header: string;
  type?: "link" | "status" | "action" | "custom";
  icons?: IconAction[];
  url?: string;
  isHidden?: boolean;
}

@Component({
  selector: "sm-table",
  templateUrl: "./sm-table.component.html",
  styleUrls: ["./sm-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("250ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class SmTableComponent implements OnChanges, AfterViewChecked {
  @Input() tableTitle: string = "";
  @Input() tableColumns: Column[] = [];
  @Input() subTableColumns: Column[] = [];
  @Input() tableData: any[] = [];
  @Input() subTableData: any[] = [];
  @Input() areColumnsOrderable: boolean = false;
  @Input() hasColumnSelect: boolean = false;

  @Output() iconAction: EventEmitter<{ element: any; action: string }> = new EventEmitter<{ element: any; action: string }>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() checkBoxAction: EventEmitter<{ element: any }> = new EventEmitter();
  @Output() checkBoxAllSelected: EventEmitter<boolean> = new EventEmitter();
  @Output() expandAction: EventEmitter<{ element: any }> = new EventEmitter();

  @ContentChild("custom", { static: false }) customTemplateRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  expandedElement?: any;
  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceExpandableRow: MatTableDataSource<any> = new MatTableDataSource();

  constructor() {}

  ngAfterViewChecked() {
    this.dataSource.sortingDataAccessor = (item, property) => this.getCellValue(item, property);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.displayedColumns = this.tableColumns.filter((c) => !c.isHidden).map((c) => c.columnDef);
    this.dataSource.data = this.tableData ?? [];
    this.dataSourceExpandableRow.data = this.subTableData ?? [];
  }

  public onRowClick(element: any) {
    if (this.expandedElement == null || this.expandedElement != element) {
      this.dataSourceExpandableRow.data = [];
      this.expandAction.emit({ element: element });
    }
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  //To be able to change the position of each column.
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  /**
   * TO IMPLEMENT WITH SORT HTTP REQUEST
   * @param sortState
   */
  public emitSortChange(sortState: Sort) {
    this.updateTableColumns();
    this.sortChange.emit(sortState);
  }

  /**
   * Emit to the parent the element data and the icon name, used to trigger the parent event
   * @param data the element in the table row
   * @param actionName the action name to know which one was clicked
   */
  public emitIconAction(data: any, actionName: string) {
    this.iconAction.emit({ element: data, action: actionName });
  }

  public emitCheckBoxAction(data: any) {
    data.checked = !data.checked;
    this.checkBoxAction.emit(data);
  }

  public getSelectableColumns() {
    return this.tableColumns.filter((c) => c.header.length > 0);
  }

  private updateTableColumns() {
    this.tableColumns.map((col: Column) => {
      if (!this.displayedColumns.includes(col.columnDef) && col.header.length > 0) {
        col.isHidden = true;
      } else if (this.displayedColumns.includes(col.columnDef) && col.header.length > 0) {
        col.isHidden = false;
      }
    });
  }

  public getSubTableColumns() {
    return this.subTableColumns.map((c) => c.columnDef);
  }

  public getCellValue(item: any, property: string) {
    let resultValue = item;

    const colDefDepth = property.split(".");
    for (let depth of colDefDepth) {
      resultValue = resultValue[depth];

      if (resultValue == undefined || resultValue == null) return "";
    }

    return resultValue;
  }

  public isAllSelected() {
    const numRows = this.dataSource.data.length;
    if (numRows == 0) return -1;

    let numSelected = this.dataSource.data.filter((item) => item.checked).length;
    if (numSelected == 0) return -1;

    return numSelected === numRows ? 0 : 1;
  }

  public toggleAllRows() {
    const numRows = this.dataSource.data.length;
    if (numRows == 0) return;

    let allSelected = this.isAllSelected() == 0;

    this.dataSource.data = this.dataSource.data.map((item) => ({ ...item, checked: !allSelected }));

    this.checkBoxAllSelected.emit(!allSelected);
  }

  public returnColumnClass(column: Column): { [klass: string]: any } {
    let classes: { [klass: string]: any } = {};
    switch (column.textAlign) {
      case "left":
        classes["align-left"] = true;
        break;
      case "right":
        classes["align-right"] = true;
        break;
      default:
        classes["align-center"] = true;
        break;
    }
    return classes;
  }
}
