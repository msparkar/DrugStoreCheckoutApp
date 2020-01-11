import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsList : object;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getProducts().subscribe(data => {
      console.log(data);
      this.productsList = data; 
     },
        error => {console.log(error)}
     
     );


  }

}
