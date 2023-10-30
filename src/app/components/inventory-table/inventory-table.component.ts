import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Promotion {
  id: number;
  title: string;
  entryDate: string;
  expirationDate: string;
}

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {
  dataSource: MatTableDataSource<Promotion>;
  displayedColumns: string[] = ['id', 'title', 'entryDate', 'expirationDate', 'actions'];

  @ViewChild(MatSort, { static: false }) sort!: MatSort; // Utiliza "!" para indicar que se inicializará más tarde
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator; // Utiliza "!" para indicar que se inicializará más tarde

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Promotion>();
  }

  ngOnInit() {
    this.http.get<Promotion[]>('https://tastypointapi.azurewebsites.net/api/v1/userprofile/1/promotions')
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort; // Utiliza "sort" sin problemas
        this.dataSource.paginator = this.paginator; // Utiliza "paginator" sin problemas
      });
  }

  deleteRow(id: number) {
    const deleteEndpoint = `https://tastypointapi.azurewebsites.net/api/v1/promotion/${id}`;
    this.http.delete(deleteEndpoint).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(promotion => promotion.id !== id);
      },
      (error) => {
        console.error('Error al eliminar la promoción:', error);
      }
    );
  }
}
