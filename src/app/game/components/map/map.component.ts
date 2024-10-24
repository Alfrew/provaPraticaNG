import { Component, OnInit } from "@angular/core";
import { MapConfigData, MapStatusService } from "@core";
import { GroundType, MapTile } from "@game";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.scss",
})
export class MapComponent implements OnInit {
  mapTileList: MapTile[] = [];
  mapConfigData!: MapConfigData;

  constructor(private mapStatusService: MapStatusService) {}

  ngOnInit(): void {
    let configData = this.mapStatusService.getMapConfigData();

    if (configData) {
      this.mapConfigData = configData;
      this.generateMap(configData);
    }
  }

  private generateMap(mapConfigData: MapConfigData) {
    const mapGrid: MapTile[] = [];

    for (let i = 0; i < this.returnTotalTileNumberForType(mapConfigData.grassPercentage); i++) {
      mapGrid.push({ groundType: "grass" });
    }
    for (let i = 0; i < this.returnTotalTileNumberForType(mapConfigData.groundPercentage); i++) {
      mapGrid.push({ groundType: "ground" });
    }
    for (let i = 0; i < this.returnTotalTileNumberForType(mapConfigData.waterPercentage); i++) {
      mapGrid.push({ groundType: "water" });
    }

    for (let i = mapGrid.length; i < this.returnTotalTileByGridSize(this.mapConfigData.gridSize); i++) {
      mapGrid.push({ groundType: this.returnRandomType() });
    }

    this.shuffle(mapGrid);

    this.mapTileList = mapGrid;
    this.logMapGridInfos();
  }

  private returnTotalTileByGridSize(gridSize: "small" | "medium" | "large"): number {
    switch (gridSize) {
      case "small":
        return 100;
      case "medium":
        return 500;
      case "large":
        return 1000;
    }
  }

  private returnTotalTileNumberForType(tilePercentage: number) {
    const totalTileForType = this.returnTotalTileByGridSize(this.mapConfigData.gridSize) * (tilePercentage / 100);
    return totalTileForType;
  }

  private logMapGridInfos() {
    console.log("total tiles: " + this.mapTileList.length);
    console.log("water: " + this.mapTileList.filter((el) => el.groundType == "water").length);
    console.log("grass: " + this.mapTileList.filter((el) => el.groundType == "grass").length);
    console.log("ground: " + this.mapTileList.filter((el) => el.groundType == "ground").length);
  }

  private returnRandomType() {
    const typeArr: GroundType[] = ["grass", "ground", "water"];
    const randomIndex = this.randomIntFromInterval(0, 2);
    return typeArr[randomIndex];
  }

  private shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  private randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
