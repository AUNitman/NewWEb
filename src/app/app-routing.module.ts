import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: '', component: PostsComponent, title: 'main' },
  { path: 'post/:id', component: PostComponent, title: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
