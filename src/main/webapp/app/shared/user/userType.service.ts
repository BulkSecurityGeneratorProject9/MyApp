import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserTypeService {

    _type: Subject<string> = new BehaviorSubject<string>(null);

    getType(): Observable<any> {
        return this._type.asObservable();
    }

    setType(type: string): void {
        this._type.next(type);
    }
}
