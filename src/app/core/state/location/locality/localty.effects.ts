import { inject } from "@angular/core";
import { Localty } from "@app/core/model/localty.model";
import { EffectFactory } from "@app/core/ngrx";


@injectable()
export class LocaltyEffects extends EffectFactory<Localty>{
    
}