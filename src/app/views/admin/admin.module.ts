import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './product/products/products.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DetailCategoryComponent } from './category/detail-category/detail-category.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { EmptyModule } from 'src/app/shared/components/empty/empty.module';
import { ErrorModule } from 'src/app/shared/components/error/error.module';
import { FilterCategoryPipe } from 'src/app/shared/pipes/filter-category.pipe';
import { UserFilterPipe } from 'src/app/shared/pipes/user-filter.pipe';
import { ProductFilterPipe } from 'src/app/shared/pipes/product-filter.pipe';
import { UsersComponent } from './user/users/users.component';
import { AddUserComponent } from './user/add-user/add-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    ProductsComponent,
    AddCategoryComponent,
    AddProductComponent,
    DetailCategoryComponent,
    DetailProductComponent,
    FilterCategoryPipe,
    UserFilterPipe,
    ProductFilterPipe,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    AdminRoutingModule,
    RouterModule,
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyModule,
    ErrorModule
  ],
})
export class AdminModule { }
