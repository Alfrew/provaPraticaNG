import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "page-test",
  template: `
    <div>Prova pagina test</div>
    <form [formGroup]="form">
      <sm-input-text formControlName="test"></sm-input-text>
    </form>
  `,
  styles: [],
})
export class TestPage implements OnInit {
  form: FormGroup = new FormGroup({
    test: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}
}
