import { Route } from '@angular/router';
export interface AsideMenuNode {
  title?: string;
  name: string;
  icon?: string;
  roles?: string[];
  routerLink?: string;
  children?: AsideMenuNode[];
}

export interface AsideMenuNodeCustomRoute extends Route {
  data?: {
    title: string;
    descricao: string;
    tituloTipo: 'rota' | 'dashboard';
  };
}
