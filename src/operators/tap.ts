import { Observable } from "../Observable";
import { Observer } from "../Observer";
import { Operator, OperatorFactory } from "./Operator";

export const tap: OperatorFactory = <T>(tapFn: Function): Operator<T> => (observable: Observable<T>) => new Observable<T>((observer: Observer<T>) => {
  let { unsubscribe } = observable.subscribe({
    next: (value: T) => {
      tapFn(value);
      observer.next(value);
    },
    error: (err: Error) => observer.error?.(err),
    complete: () => observer.complete?.()
  });

  return { unsubscribe };
});