import { createAction, props } from "@ngrx/store";

export const setFocusOnInput = createAction('[Form] Set ',
    props<{elementId: string}>()
);