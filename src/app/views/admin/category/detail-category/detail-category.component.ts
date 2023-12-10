import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.sass']
})
export class DetailCategoryComponent implements OnInit {
  idCategory: number;
  category: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    this.idCategory = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.idCategory);
    this.getById();
  }

  getById() {
    this.categoryService.getById(this.idCategory)
      .subscribe(
        (response: ICategory) => {
          console.log(response);
          this.category = response;
        },
        () => {
          console.log("Hubo un error")
        }
      )
  }
}
