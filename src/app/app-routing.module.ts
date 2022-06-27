import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexResolverService } from './services/resolver-index.service';
import { PostsResolverService } from './services/resolver-post.service';

const routes: Routes = [
  {
    path: '',
    resolve: { result: IndexResolverService },
    loadComponent: () =>
      import('./components/index.component').then((c) => c.IndexComponent),
  },
  {
    path: '**',
    resolve: { result: PostsResolverService },
    loadComponent: () =>
      import('./components/post.component').then((c) => c.PostComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
