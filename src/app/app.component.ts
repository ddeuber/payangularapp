import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'payangularapp';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('add_circle', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add_circle.svg'));
    this.matIconRegistry.addSvgIcon('add_shopping_cart', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add_shopping_cart.svg'));
    this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/delete.svg'));
    this.matIconRegistry.addSvgIcon('group_add', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/group_add.svg'));
    this.matIconRegistry.addSvgIcon('more_vert', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/more_vert.svg'));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/settings.svg'));
  }
}
