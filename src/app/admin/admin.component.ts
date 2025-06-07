import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'admin-layout',
    imports: [RouterOutlet],
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
})
export class AdminLayoutComponent{

}