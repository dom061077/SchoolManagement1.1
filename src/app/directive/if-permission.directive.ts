import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { KeycloakService } from '../auth/keycloak/keycloak.service';

@Directive({
  selector: '[appIfPermission]'
})
export class IfPermissionDirective implements OnInit {

  @Input() ifPermission!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ks: KeycloakService
  ) { }

  ngOnInit() {
    // We check the granular Client role against your Spring API client ID
    if (this.ks.hasRole(this.ifPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
