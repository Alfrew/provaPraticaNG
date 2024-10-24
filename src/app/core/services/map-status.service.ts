import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MapConfigData } from "@core";

@Injectable({
  providedIn: "root",
})
export class MapStatusService {
  private mapConfigData!: MapConfigData;

  constructor(private router: Router) {
    this.getFromLocalStorage();
  }

  public saveMapConfigData(newMapConfigData: MapConfigData) {
    this.mapConfigData = newMapConfigData;
    localStorage.setItem("mapConfigData", JSON.stringify(this.mapConfigData));
  }

  public getMapConfigData(): MapConfigData | void {
    if (this.mapConfigData) {
      return this.mapConfigData;
    } else {
      this.router.navigate(["/map"]);
    }
  }

  private getFromLocalStorage() {
    const configData = localStorage.getItem("mapConfigData");
    if (configData) {
      this.mapConfigData = JSON.parse(configData);
    }
  }
}
