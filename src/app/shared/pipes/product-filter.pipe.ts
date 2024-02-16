import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(item: any[], searchText: string): any[] {
    if (!item) return [];
    if (!searchText) return item;

    searchText = searchText.toLowerCase();
    console.log(item);
    return item.filter((item: { title: string; }) => {
      return item.title.toLowerCase().includes(searchText);
    })
  }

}
