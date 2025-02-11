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
  ) {
  }

  logo = '';

  ngOnInit() {
    this.title.setTitle(environment.service_name);
    console.log(this.rotas);
  }

  rotas: Array<AsideMenuNode> = [
    {
      name: 'Gerador de horas',
      children: [
        {
          name: 'Gerar horas em planilha',
          routerLink: '/admin/generator',
        },
      ],
    },
    {
      name: 'Sair',
      icon: 'exit_to_app',
      routerLink: '/admin/logout',  // Definindo a rota de logout
    },
  ];
}

  

  

