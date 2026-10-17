export type StateUpdater<T> =
  | T
  | ((previousState: T) => T);

export type StateDispatcher<T> = (nextState: StateUpdater<T>) => void;

export type UseState = <T>(
  initialValue: T,
) => [state: T, setState: StateDispatcher<T>];
