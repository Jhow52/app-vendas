export interface Receber {
  id?: number;
  vendaId: number;
  clienteId: number;
  nomeCliente: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'pendente' | 'pago' | 'vencido';
}
