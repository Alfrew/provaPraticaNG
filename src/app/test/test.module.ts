import { TestPage } from "./test.page";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { SmInputTextModule } from "@shared";

@NgModule({
  declarations: [TestPage],
  imports: [CommonModule, TestRoutingModule, SmInputTextModule],
  exports: [TestPage],
})
export class TestModule {}
