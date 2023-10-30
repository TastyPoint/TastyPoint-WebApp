import {Component, Input, ViewChild} from '@angular/core';
import {InventoryFilterCallback, InventoryFilterOptions} from "./models/filter";
import {NgForm} from "@angular/forms";
import {FormField} from "../../../models/form-field";

@Component({
  selector: 'app-inventory-filter',
  templateUrl: './inventory-filter.component.html',
  styleUrls: ['./inventory-filter.component.css']
})
export class InventoryFilterComponent {
  @Input({ required: true })
  public filterCallback!: InventoryFilterCallback;


  @ViewChild('filterForm', {static: false})
  filterForm!: NgForm;
  filterFields: FormField[] = [
    {
      label: "Search",
      field: "search",
      placeholder: "Search name or id",
      required: false,
      type: "text",
      value: ""
    }
  ]

  search() {
    const options: InventoryFilterOptions = {
      name: this.controlValue("search")
    };

    this.filterCallback.onSearch(options);
  }

  onSearch() {
    if(this.filterForm.valid) {
      this.search();
    }
  }
  controlValue(controlName: string): string { return this.filterForm.controls[controlName].value; }
  hasError(field: string, errorCode: string): boolean{ return this.filterForm?.controls[field]?.hasError(errorCode); }

  onReset() {
    this.filterCallback.onReset();
  }

  onKeyUp(field: FormField) {
    this.search();
  }
}



