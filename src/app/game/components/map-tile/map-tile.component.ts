import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { GroundType } from "../../models/map-tile";

@Component({
  selector: "app-map-tile",
  templateUrl: "./map-tile.component.html",
  styleUrl: "./map-tile.component.scss",
})
export class MapTileComponent {
  @Input() tileType!: GroundType;
}
