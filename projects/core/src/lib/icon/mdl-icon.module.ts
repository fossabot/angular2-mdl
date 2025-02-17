import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlIconComponent} from './mdl-icon.component';


export * from './mdl-icon.component';

const MDL_ICON_DIRECTIVES = [MdlIconComponent];

@NgModule({
  imports: [],
  exports: MDL_ICON_DIRECTIVES,
  declarations: MDL_ICON_DIRECTIVES,
})
export class MdlIconModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlIconModule,
      providers: []
    };
  }
}
