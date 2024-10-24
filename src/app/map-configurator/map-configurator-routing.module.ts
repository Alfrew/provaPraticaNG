import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MapConfiguratorPage } from "./map-configurator/map-configurator.page";

const routes: Routes = [{ path: "", component: MapConfiguratorPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapConfiguratorRoutingModule {}
