import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {InventoryFilterCallback, InventoryFilterOptions} from "../inventory/inventory-filter/models/filter";
import {ProductCollection} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";
import {UpdateItemCallback} from "../update-inventory/update-inventory.component";
import {CreateItemCallback} from "../register-inventory/register-inventory.component";


@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit, InventoryFilterCallback, UpdateItemCallback, CreateItemCallback {
  dataSource: MatTableDataSource<ProductCollection>;
  displayedColumns: string[] = [ 'id', 'title', 'entryDate', 'expirationDate', 'actions'];

  @ViewChild(MatSort, { static: false }) sort!: MatSort; // Utiliza "!" para indicar que se inicializará más tarde
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator; // Utiliza "!" para indicar que se inicializará más tarde


  data: ProductCollection[] = [];

  isEdit: boolean = false;
  editProduct!: ProductCollection;

  isRegister: boolean = false;

  constructor(private productsService: ProductsService) {
    this.dataSource = new MatTableDataSource<ProductCollection>();
  }

  ngOnInit() {
    this.productsService.getAll()
      .then(data => {
        this.dataSource.data = data;
        this.data = [...this.dataSource.data]
        this.dataSource.sort = this.sort; // Utiliza "sort" sin problemas
        this.dataSource.paginator = this.paginator; // Utiliza "paginator" sin problemas
      });
  }

  deleteRow(id: string) {
    this.productsService.delete(id)
    this.data = this.data.filter(it => it.uid != id);
    this.dataSource.data = [...this.data];
  }

  updateProduct(product: ProductCollection) {
    this.editProduct = product;
    this.isEdit = true;
  }

  onSearch(options: InventoryFilterOptions): void {
    this.dataSource.data = this.data.filter(item => {
      return item.uid == options.name || item.item.name.toLowerCase().includes(options.name.toLowerCase());
    })
  }

  onReset(): void {
    this.dataSource.data = this.data;
  }

  onCancel(): void {
    this.isEdit = false;
  }

  afterUpdated(product: ProductCollection): void {
    this.isEdit = false;
  }

  back() {
    if(this.isEdit) {
      this.isEdit = false;
    }

    if(this.isRegister) {
      this.isRegister = false;
    }
  }

  afterCreate(product: ProductCollection): void {
    this.data.push(product);
    this.dataSource.data.push(product);
    this.isRegister = false;
  }

  handleCancelRegister() {
    this.isRegister = false;
  }
}
