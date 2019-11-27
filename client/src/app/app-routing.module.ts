import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReaderComponent} from './reader/reader.component';
import {AuthGuard} from './auth.guard';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {
        path: '',
        children: [
            {
                path: 'reader/:bookId',
                canActivate: [AuthGuard],
                component: ReaderComponent
            },
            {
                path: 'editor',
                canActivate: [AuthGuard],
                component: EditorComponent
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
