import { Pipe, PipeTransform } from '@angular/core';
import * as format from 'date-fns/format';
import * as differenceInDays from 'date-fns/difference_in_days';
@Pipe({
    name: 'chatDate'
})

export class ChatDatePipe implements PipeTransform {
    transform(date: any) {
        let days = differenceInDays(new Date(), date);
        switch (days) {
            case 0:
                return format(date, 'h:mm A');
            case 1:
                return 'Yesterday';
            case 2:
            case 3:
                return format(date, 'dddd');
            default:
                return format(date, 'M/D/YY');
        }
    }
}