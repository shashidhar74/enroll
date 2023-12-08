import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';
import { pipe } from 'rxjs';
@Pipe({
  name :'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
          return items;
         
        }
        
        searchText = searchText.toLowerCase();
        return items.filter(item =>
          item.eventname.toLowerCase().includes(searchText) ||
          item.fullname.toLowerCase().includes(searchText) 
        );

      
      }
  

}
