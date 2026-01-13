import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CategoryService } from "../../../service/CategoryService";
import { Category } from "../../../entity/Category";
import { Subscription } from "rxjs";
import { PublisherService } from "../../../service/PublisherService";
import { Publisher } from "../../../entity/Publisher";

@Component({
  selector: 'sub-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './sub-detail.component.css',
  templateUrl: './sub-detail.component.html',
})
export class SubDetailComponent implements OnInit {
  @Input() publishers: {
    publisherId: string;
    name: string;
  }[] = [];

  async ngOnInit(): Promise<void> {}
}