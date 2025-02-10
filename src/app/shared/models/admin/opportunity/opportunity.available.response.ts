export interface OpportunityAvailableResponse {
  idOpportunity: number;
  idStatusOpportunity: number;
  idProposal: number;
  idUserBorrower: number;
  codigoOportunidade: string;
  qtdCotasDisponiveis: number;
  qtdTotalCotas: number;
  valorTotalCaptar: number;
  valorTotalCaptado: number;
  valorCota: number;
  taxaReceberAm: number;
  nomeTomador: string;
  hasCTA:number;
  inicioCaptacao: Date;
}