import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

export const AppRoutes: Routes = [
  { path: "login", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  { path: "player", loadChildren: () => import("./pages/player/player.module").then(m => m.PlayerModule), canLoad: [AuthGuard] },
  { path: "**", redirectTo: "player", pathMatch: "full" }
]
