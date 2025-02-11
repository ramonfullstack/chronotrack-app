import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
    data: {
      title: 'Gerador de horas',
      descricao: 'Descrição do Gerador de Horas', // Aqui você pode adicionar a descrição ou deixá-la em branco
      tituloTipo: 'rota',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorRoutingModule {}
