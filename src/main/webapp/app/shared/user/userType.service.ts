import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class UserTypeService {
    private _type: BehaviorSubject<string> = new BehaviorSubject();

    get type() : Observable {
        return this._type.asObservable();
    }
    
    set type(type: string) {
        this._type.next(type);
    }
}
