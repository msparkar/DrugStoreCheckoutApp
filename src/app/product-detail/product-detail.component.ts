import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  user : User;
  product : Product;
  productCode : string;
  purchasedMessage : string;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.purchasedMessage = '';
    this.apiService.getCurrentUserProfile().subscribe(
      user => {
        if(user == null || user.userId == null)
          this.router.navigate(['/Login']);
        this.user = user; 

      },
      error => {console.log(error)}     
    );

    this.route.params.subscribe(params => {
      this.productCode = params['code'];
      this.apiService.getProductByCode(this.productCode).subscribe(data => {
        this.product = data;
      },
          error => {console.log(error)}     
      );
    });
  }

  
  BuyProduct()  {
    var qty : number = 1;
    this.purchasedMessage = 'You purchased ' + qty + ' units of ' + this.product.name;

    this.apiService.buyProductForUser(this.product.code, this.user.userId, qty).subscribe(
      data => {
      },
      error => {console.log(error)}     
    );

  }
}
