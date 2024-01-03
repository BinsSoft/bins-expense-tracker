import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFlag'
})
export class UserFlagPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (args.length > 0  && Array.isArray(args[0]) && value!=null) {
      const user = args[0].find((c: any) => value == c.id);
      if (user) {
        return user.name;
      }
    }
    return value;
  }

}
