import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {

  orderHistoryRecordsList : object;
  dataSource;
  constructor(private apiService: ApiService, private router: Router) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'BuyerName', 'ProductName', 'ProductCompany', 'quantityOrdered', 'purchaseDate'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.apiService.getCurrentUserProfile().subscribe(data => {
      if(data == null || data.userId == null)
        this.router.navigate(['/Login']);
     },
        error => {console.log(error)}     
     );


    this.apiService.getOrderHistory().subscribe(data => {
      this.orderHistoryRecordsList = data; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort; 
    },
        error => {console.log(error)}
     
     );


  }

}
