import {ComponentRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {MdlDialogReference} from './mdl-dialog.service';
import {IMdlDialogConfiguration} from './mdl-dialog-configuration';

/**
 * Internal representation of the dialog ref. the service
 * user should not have access to the created components
 * and internal implementations.
 */
export class InternalMdlDialogReference {

  public hostDialogComponentRef: ComponentRef<any>;
  public closeCallback: () => void;
  public isModal = false;
  public dialogRef: MdlDialogReference;
  private onHideSubject: Subject<any> = new Subject();
  private onVisibleSubject: Subject<any> = new Subject();

  constructor(public config: IMdlDialogConfiguration) {
    this.dialogRef = new MdlDialogReference(this);
  }

  get hostDialog() {
    return this.hostDialogComponentRef.instance;
  }

  public hide(data?: any) {
    this.onHideSubject.next(data);
    this.onHideSubject.complete();
    this.closeCallback();
  }

  public visible() {
    this.onVisibleSubject.next();
    this.onVisibleSubject.complete();
  }

  public onHide(): Observable<any> {
    return this.onHideSubject.asObservable();
  }

  public onVisible(): Observable<void> {
    return this.onVisibleSubject.asObservable();
  }
}
