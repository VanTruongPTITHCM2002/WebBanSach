import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
    selector: 'admin-layout',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
})
export class AdminLayoutComponent{

}