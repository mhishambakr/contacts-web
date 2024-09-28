import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './features/contact-form/contact-form.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        canActivate: [AuthGuard],
        component: ContactsComponent
    },
    {
        path: 'add-contact',
        canActivate: [AuthGuard],
        component: ContactFormComponent
    },
    {
        path: '**',
        redirectTo: '/contacts'
    }
];
