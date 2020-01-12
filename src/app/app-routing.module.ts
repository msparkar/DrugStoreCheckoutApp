import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



const routes: Routes = [
  { path: 'Products', component:ProductComponent  },
  { path: 'Profile', component:UserComponent  },
  { path: 'Login', component:UserLoginComponent  },

  { path: 'Product/:code', component: ProductDetailComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
