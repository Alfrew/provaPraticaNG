import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "map", loadChildren: () => import("./map-configurator/map-configurator.module").then((m) => m.MapConfiguratorModule) },
  { path: "game", loadChildren: () => import("./game/game.module").then((m) => m.GameModule) },
  { path: "", redirectTo: "map", pathMatch: "full" },
  { path: "**", redirectTo: "map", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
