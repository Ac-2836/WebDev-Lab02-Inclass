export interface Item {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export type ViewState<T> =
  | { readonly status: 'IDLE' }
  | { readonly status: 'LOADING' }
  | { readonly status: 'SUCCESS'; readonly data: T }
  | { readonly status: 'ERROR'; readonly error: string };

export type FetchFeed = () => Promise<Item[]>;
