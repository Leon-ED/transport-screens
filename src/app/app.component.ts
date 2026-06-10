import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export type status = 'running' | 'off' | 'broken' | 'setup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private sanitizer = inject(DomSanitizer);

  status: status = 'running';
  statusList: status[] = ['off', 'setup', 'running', 'broken'];

  statusUrl: Record<status, SafeResourceUrl>;

  constructor() {
    this.statusUrl = {
      // running: this.sanitizer.bypassSecurityTrustResourceUrl(
      //   'https://departs.leon.gp/screen?screenId=rer&stopId=fr-idf_IDFM:412697&lineId=fr-idf_IDFM:C01742&filterType=branch&branchHash=Retour&customDestinations=UGFyaXMlMkMlMjBTdC1HZXJtYWluLWVuLUxheWUlMEFQb2lzc3klMkMlMjBDZXJneQ=='
      // ),
       running: this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://localhost:59990/screen'
      ),
      // running: this.sanitizer.bypassSecurityTrustResourceUrl(
      //   'https://siel-tram.leon.gp/?stop=73654&line=C01390&invertedColumns=false&branches=Aller&mode=AUTO'
      // ),
      off: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      broken: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://departs.leon.gp/screen?screenId=none'
      ),
      setup: this.sanitizer.bypassSecurityTrustResourceUrl(''),
    };
  }

  nextStatus() {
    const currentIndex = this.statusList.indexOf(this.status);
    const nextIndex = (currentIndex + 1) % this.statusList.length;
    console.log('Next status:', this.statusList[nextIndex]);
    this.status = this.statusList[nextIndex];
  }

  previousStatus() {
    const currentIndex = this.statusList.indexOf(this.status);
    const previousIndex =
      (currentIndex - 1 + this.statusList.length) % this.statusList.length;
      console.log('Previous status:', this.statusList[previousIndex]);
    this.status = this.statusList[previousIndex];
  }
}
