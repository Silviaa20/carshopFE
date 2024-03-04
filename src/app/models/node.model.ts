/** Interfaccia per i nodi di un albero di nodi */
export interface Nodes {
  /** Il nome del nodo che viene mostrato nell'albero */
  name: string;
  /** Lista di nodi figli del nodo */
  children?: Nodes[];
  /** Il path a cui fa riferimento il nodo */
  path?: string;
  /** L'icona da mostrare nel nodo */
  icon?: string;
  /** Lista di path figli del nodo */
  childrenPath?: string[];
}
