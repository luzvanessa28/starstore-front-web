import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { ProductsComponent } from './product/products/products.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DetailCategoryComponent } from './category/detail-category/detail-category.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { UsersComponent } from './user/users/users.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'update-category/:id',
        component: AddCategoryComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'detail-category/:id',
        component: DetailCategoryComponent
      },
      {
        path: 'detail-product/:id',
        component: DetailProductComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'update-product/:id',
        component: AddProductComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'update-user/:id',
        component: AddUserComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
