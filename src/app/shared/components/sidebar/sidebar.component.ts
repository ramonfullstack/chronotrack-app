import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AsideMenuNode } from '@shared/models/sidebar-menu-node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SharedService } from '@shared/shared.service';
import { TokenService } from '@core/storages/token.service';
import { Router } from '@angular/router';
import { CookieStorage } from '@core/storages/CookieStorage.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private elRef: ElementRef,
    private service: SharedService,
    private token: TokenService,
    private cookieService: CookieStorage
  ) {}

  @Input() rotas: Array<AsideMenuNode> = [];
  @Input() corBackground: string = '';

  dataSource = new MatTreeNestedDataSource<AsideMenuNode>();
  treeControl = new NestedTreeControl<AsideMenuNode>((node) => node.children);

  ngOnInit() {
    this.userRoles = this.cookieService.GetRoles();
    this.createListDataSource();
    this.updateCorBackgroundLinkActive();
  }

  realizarLogoff = (name: string) =>
    name === 'Sair' ? this.cookieService.RemoveTokenFromCookies() : null;

  userRoles: any[];

  getUserRoles() {
    this.service.getUserRole().subscribe((res: any) => {
      this.userRoles = res;
      this.createListDataSource();
    });
  }

  updateCorBackgroundLinkActive() {
    this.elRef.nativeElement.style.setProperty(
      '--background-active',
      this.corBackground
    );
  }

  createListDataSource() {
    let rotasAux: Array<AsideMenuNode> = [];
    
    if(this.userRoles) {
      if(!this.userRoles.includes('Entrepay')) {
        for(let rota of this.rotas) {
          rota.children =  rota.children?.filter((child) => !child.roles?.includes('Entrepay'));
        }
      }
    }
    
    this.dataSource.data = this.rotas;
  }
    
  

  hasChild(_: number, node: AsideMenuNode) {
    return !!node.children && node.children.length > 0;
  }

  checkIsActive(node: AsideMenuNode): string {
    const isActive = node.children?.some((child) =>
      child.routerLink?.includes(this.router.url)
    );
    return isActive ? 'active' : '';
  }
}
