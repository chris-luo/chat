import { Pipe, PipeTransform } from '@angular/core';
import * as format from 'date-fns/format';
import * as differenceInDays from 'date-fns/difference_in_days';
import * as differenceInHours from 'date-fns/difference_in_hours'
@Pipe({
    name: 'chatDate'
})

export class ChatDatePipe implements PipeTransform {
    transform(date: any) {
        let hours = differenceInHours(new Date(), date);
        console.log(hours);
        if (hours < 12) {
            return format(date, 'h:mm A');
        }
        if (hours < 24) {
            return 'Yesterday';
        }
        if (hours < 72) {
            return format(date, 'dddd');
        }
        return format(date, 'M/D/YY');
    }
}