import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReaderComponent} from './reader/reader.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)},
    {
        path: '',
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'reader/:bookId',
                component: ReaderComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
