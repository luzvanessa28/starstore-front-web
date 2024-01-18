import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(item: any[], searchText: string): any[] {
    if (!item) return [];
    if (!searchText) return item;

    searchText = searchText.toLowerCase();

    return item.filter((item: { name: string; }) => {
      return item.name.toLowerCase().includes(searchText);
    })
  }

}
