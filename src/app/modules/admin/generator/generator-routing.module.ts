import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
    data: {
      title: 'Extrato de <b>Operações</b>',
      descricao: '',
      tituloTipo: 'rota',
    },
  },
  {
    path: ':cnpj',
    component: GeneratorComponent,
    data: {
      title: 'Extrato de <b>Operações</b>',
      descricao: '',
      tituloTipo: 'rota',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorRoutingModule {}
