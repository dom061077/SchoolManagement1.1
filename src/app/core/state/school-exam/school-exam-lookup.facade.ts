
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
//Composition Pattern (Facade-injects-Facades).
export class SchoolExamLookupFacade {
    readonly subjects: Signal<Subject[]> = this.subject
}
