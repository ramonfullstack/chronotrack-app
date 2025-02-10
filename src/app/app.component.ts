import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.isLoading.subscribe((res) => {
      this.loading = res;
      this.cd.detectChanges();
    });
  }
}
