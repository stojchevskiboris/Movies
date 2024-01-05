import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  transform(langId: string): string {
    return languages[langId]
  }
}

enum languages{
    English = 1,
    German,
    French,
    Spanish,
    Macedonian,
    Serbian,
    Russian,
    Italian,
    Indian
}