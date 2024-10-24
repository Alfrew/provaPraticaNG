import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MapConfigData, MapStatusService } from "@core";
import { InputSelectOption } from "@shared";

@Component({
  templateUrl: "./map-configurator.page.html",
  styleUrl: "./map-configurator.page.scss",
})
export class MapConfiguratorPage {
  mapForm: FormGroup = new FormGroup({
    waterPercentage: new FormControl(33, [Validators.required, Validators.max(33), Validators.min(10)]),
    groundPercentage: new FormControl(33, [Validators.required, Validators.max(33), Validators.min(10)]),
    grassPercentage: new FormControl(33, [Validators.required, Validators.max(33), Validators.min(10)]),
    gridSize: new FormControl("small", [Validators.required]),
  });
  selectGridSizeList: InputSelectOption[] = [
    { value: "small", viewValue: "Piccola, 100 caselle (10x10)" },
    { value: "medium", viewValue: "Media, 500 caselle (25x20)" },
    { value: "large", viewValue: "Grande, 1000 caselle (40x25)" },
  ];

  constructor(private mapStatusService: MapStatusService, private router: Router) {}

  public resetForm() {
    this.mapForm.setValue({
      waterPercentage: 33,
      groundPercentage: 33,
      grassPercentage: 33,
      gridSize: "small",
    });
  }

  public saveMapAndPlay() {
    if (this.mapForm.valid) {
      const formData: MapConfigData = this.mapForm.value;
      this.mapStatusService.saveMapConfigData(formData);
      this.router.navigate(["/game"]);
    }
  }
}
