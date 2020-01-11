import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [
  { path: 'Products', component:ProductComponent  },
  { path: 'User', component:UserComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
