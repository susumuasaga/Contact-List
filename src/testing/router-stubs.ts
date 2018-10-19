import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActivatedRouteStub {
  private _testParamMap: ParamMap;
  private subject = new BehaviorSubject(this._testParamMap);
  paramMap = this.subject.asObservable();

  constructor (params?: Params) {
    this.testParamMap = params;
  }
  set testParamMap(params: Params) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }
  get snapshot() {
    return { paramMap: this._testParamMap };
  }
}
