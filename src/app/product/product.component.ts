import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsList : object;
  dataSource;
  constructor(private apiService: ApiService, private router: Router) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 'name', 'company', 'actions'];



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


    this.apiService.getProducts().subscribe(data => {
      this.productsList = data; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort; 

    },
        error => {console.log(error)}
     
     );


  }

}
