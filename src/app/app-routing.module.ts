import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: '',
		loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
