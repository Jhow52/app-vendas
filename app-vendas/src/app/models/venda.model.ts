export interface ItemVenda {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Venda {
  id?: number;
  clienteId: number;
  nomeCliente: string;
  itens: ItemVenda[];
  total: number;
  status: 'pendente' | 'pago' | 'cancelado';
  dataCriacao: string;
}
