import { convertToParamMap, ParamMap, Params, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * An ActivatedRRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  private subject = new BehaviorSubject<ParamMap>(null);
  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  constructor (params?: Params) {
    this.setParamMap(params);
  }

  /** Set the paramMap observable next value */
  setParamMap(params: Params): void {
    this.subject.next(convertToParamMap(params));
  }

  get snapshot(): { paramMap: ParamMap } {
    return { paramMap: this.subject.value };
  }
}
