import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class UserTypeService {
    private _type: BehaviorSubject<string> = new BehaviorSubject(null);

    getType(): Observable<any> {
        return this._type.asObservable();
    }

    setType(type: string) {
        this._type.next(type);
    }
}
