import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GamePage, MapComponent, MapTileComponent, PlayerComponent } from "@game";
import { GameRoutingModule } from "./game-routing.module";

@NgModule({
  declarations: [MapTileComponent, MapComponent, GamePage, PlayerComponent],
  imports: [CommonModule, GameRoutingModule],
  exports: [],
})
export class GameModule {}
