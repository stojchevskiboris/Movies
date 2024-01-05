import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if(hours==0){
        return minutes + "m";
    }
    return hours+"h " + minutes + "m";
  }
}