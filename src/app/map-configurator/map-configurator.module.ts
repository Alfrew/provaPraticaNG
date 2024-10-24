import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapConfiguratorRoutingModule } from "./map-configurator-routing.module";
import { MapConfiguratorPage } from "@map";
import { ReactiveFormsModule } from "@angular/forms";
import { SmFlatButtonModule, SmInputNumberModule, SmInputSelectModule } from "@shared";

@NgModule({
  declarations: [MapConfiguratorPage],
  imports: [CommonModule, ReactiveFormsModule, MapConfiguratorRoutingModule, SmInputSelectModule, SmInputNumberModule, SmFlatButtonModule],
  exports: [],
})
export class MapConfiguratorModule {}
