import { Directive, Input, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { KeycloakService } from '../auth/keycloak/keycloak.service';

@Directive({
  selector: '[appIfRole]'
})
export class IfRoleDirective implements OnInit{
  @Input() appIfRole!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ks: KeycloakService
  ) { }

  ngOnInit() {
    if(this.ks.hasRole(this.appIfRole)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainer.clear();
    }
  }

}
