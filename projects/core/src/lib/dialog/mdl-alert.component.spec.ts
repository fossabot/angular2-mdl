import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlDialogModule} from './mdl-dialog.module';
import {By} from '@angular/platform-browser';
import {MdlAlertComponent} from './mdl-alert.component';
import {MdlDialogOutletModule} from '../dialog-outlet/mdl-dialog-outlet.module';


@Component({
  // tslint:disable-next-line
  selector: 'test-component',
  template: `
    <mdl-alert
      #alert="mdlAlert"
      title="Title (optional)"
      message="This is a <em class='mdl-color-text--primary'>simple</em> Alert"
      okText="Got it!"
      (confirmed)="alertConfirmd()"></mdl-alert>
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestComponent {

  public alertConfirmd() {
  }
}


describe('MdlAlert', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule],
      declarations: [MdlTestComponent]
    });
  }));

  it('should create, show and close the dialog', async(() => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    const mdlAlert = fixture.debugElement.query(By.directive(MdlAlertComponent)).componentInstance;

    mdlAlert.show();
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'alertConfirmd');

    // close the dialog by clicking the ok button
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.alertConfirmd).toHaveBeenCalled();
    });

  }));


});
