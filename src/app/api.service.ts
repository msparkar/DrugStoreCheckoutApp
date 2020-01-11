import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './Models/Product';
import { User } from './Models/User';
import { Observable } from 'rxjs';
import {from} from 'rxjs';
const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts() :Observable<Product[]> {
    //return this.getProductsTest();
    return this.http.get<Product[]>(`${api}/products`)
  }

  getUser() {
    return this.http.get<User>(`${api}/User/Profile`)
  }

   updateUser(user: User) {
     return this.http.put<User>(`${api}/User/${user.userId}`, user);
   }
}
