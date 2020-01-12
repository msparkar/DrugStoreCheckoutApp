import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './Models/Product';
import { User } from './Models/User';
import { Observable } from 'rxjs';
import {from} from 'rxjs';
const api = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() :Observable<Product[]> {
    //return this.getProductsTest();
    return this.http.get<Product[]>(`${api}/api/products`, { withCredentials: true })
  }

  getProductByCode(productCode : string) :Observable<Product> {
    return this.http.get<Product>(`${api}/api/product/${productCode}`, { withCredentials: true })
  }

  buyProductForUser(productCode : string, userId : number, quantity :number) :Observable<boolean> {

    var buyRequest = {
      productCode : productCode, 
      userId : userId, 
      quantity :quantity
    }
    return this.http.post<boolean>(`${api}/api/buyProductForUser`, buyRequest);
  }

  getCurrentUserProfile()
  {
    return this.http.get<User>(`${api}/user/getProfile`, { withCredentials: true })
  }

  updateUser(user: User) {
    return this.http.post<User>(`${api}/user/saveProfile`, user);
  }

  userLogin(username: string, password : string) {

    return this.http.post<boolean>(`${api}/user/login`, {"username" : username, "password" : password});
  }

 
}
