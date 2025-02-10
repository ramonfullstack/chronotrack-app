import { Component, Input, OnChanges } from '@angular/core';
import { AsideMenuNode } from '@shared/models/sidebar-menu-node';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnChanges {
  backButton: boolean = false;

  title: string = '';

  tituloTipo: 'rota' | 'dashboard' = 'rota';

  backPathUrl: string = '';

  descricao: string = '';

  @Input() rotas: Array<AsideMenuNode> = [];

  @Input() logo: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private mudancaRota: Router
  ) {
    this.updateTitle();
  }

  ngOnChanges() {
    this.updateTitle();
  }

  updateTitle() {
    this.mudancaRota.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.title = this.route.snapshot.firstChild?.firstChild?.data['title'];
        this.descricao =
          this.route.snapshot.firstChild?.firstChild?.data['descricao'];
        this.tituloTipo =
          this.route.snapshot.firstChild?.firstChild?.data['tituloTipo'];
        this.backPathUrl =
          this.route.snapshot.firstChild?.firstChild?.data['backPathUrl'];
        this.backButton = !!this.backPathUrl;
      }
    });
  }

  dispositivoMovel: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  changeTitle(title: string) {
    this.title = title;
  }

  backPath() {
    let x = this.mudancaRota.url;
    let back = x.slice(
      0,
      x.length - 1 - x.split('/')[x.split('/').length - 1].length
    ); //transformar para REGEX
    back =
      this.backPathUrl == null || this.backPathUrl == ''
        ? back
        : this.backPathUrl;
    this.mudancaRota.navigateByUrl(back);
  }
}
