import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AsideMenuNode } from '@shared/models/sidebar-menu-node';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(private title: Title
  ) {}

  logo = '';

  ngOnInit() {
    this.title.setTitle(environment.service_name);
  }

  rotas: Array<AsideMenuNode> = [
    {
      name: 'Gerador de horas',
      children: [
        {
          name: 'Gerar horas em planilha',
          roles: [''],  // Você pode definir permissões específicas se necessário
          routerLink: '/admin/generator',  // Caminho correto para o componente
        },
      ],
    },
    {
      name: 'Sair',
      icon: 'exit_to_app',
      roles: [''],
      routerLink: '/admin/logout',  // Definindo a rota de logout
    },
  ];
}
