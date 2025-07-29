import { Injectable } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntlService extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();

  }
  
  getTranslations() {
    this.itemsPerPageLabel = this.translate.instant('COMMON.PAGINATOR_ITEMS_PER_PAGE');
    this.nextPageLabel = this.translate.instant('COMMON.PAGINATOR_NEXT_PAGE');
    this.previousPageLabel = this.translate.instant('COMMON.PAGINATOR_PREVIOUS_PAGE');
    this.firstPageLabel = this.translate.instant('COMMON.PAGINATOR_FIRST_PAGE');
    this.lastPageLabel = this.translate.instant('COMMON.PAGINATOR_LAST_PAGE');
    this.changes.next();
  }


  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('COMMON.PAGINATOR_RANGE', { start: 0, end: 0, length });
    }

    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return this.translate.instant('COMMON.PAGINATOR_RANGE', {
      start: startIndex + 1,
      end: endIndex,
      length: length
    });
  }  


}
