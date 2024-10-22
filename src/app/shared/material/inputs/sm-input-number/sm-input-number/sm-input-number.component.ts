import { Component, forwardRef, Host, Input, Optional, OnInit, SkipSelf } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlContainer, FormControl, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "sm-input-number",
  templateUrl: "./sm-input-number.component.html",
  styleUrls: ["./sm-input-number.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmInputNumberComponent),
      multi: true,
    },
  ],
})
export class SmInputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName?: string;
  @Input() isCurrency: boolean = false;
  @Input() isPercentage: boolean = false;
  @Input() label: string = "";
  @Input() maxValue: string = "";
  @Input() minValue: string = "";
  @Input() placeholder: string = "";

  formControl?: FormControl;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    this.formControlCreator();
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}

  /**
   * Create a formControl instance from the parent form group.
   * @TODO Create a service and put this inside, so it can be used from other shared components.
   */
  formControlCreator() {
    if (this.formControlName) {
      if (this.controlContainer) {
        this.formControl = this.controlContainer.control!.get(this.formControlName) as FormControl;
      } else {
        console.error("Can't find parent FormGroup directive");
      }
    }
  }
}
