export type VNodeType =
  | string
  | ((props: VNodeProps) => VNode);

export interface VNodeProps {
  readonly [key: string]: unknown;
  readonly children: VNode[];
  readonly nodeValue?: string;
}

export interface VNode {
  readonly type: VNodeType;
  readonly props: VNodeProps;
}
