import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Category } from "../../../entity/Category";
import { Subscription } from "rxjs";
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
  @Input() selectedPublisher: string | null = null;
  @Output() selectedPublisherChange = new EventEmitter<number | null>();
  @Output()
  sortChange = new EventEmitter();

  priceRanges = [
    { min: 0, max: 150000, label: '0 - 150.000 ₫' },
    { min: 150000, max: 300000, label: '150.000 - 300.000 ₫' },
    { min: 300000, max: 500000, label: '300.000 - 500.000 ₫' },
    { min: 500000, max: null, label: '500.000 ₫ - Trở lên' },
  ];

  @Input() selectedPrice: {
    min: number | null;
    max: number | null;
    label: string;
  } | null = {
    min: null,
    max: null,
    label: '',
  };

  @Output() selectedPriceChange = new EventEmitter<{
    min: number | null;
    max: number | null;
    label: string;
  } | null>();

  handleSort() {
    this.sortChange.emit();
  }

  clearFilter() {
    this.selectedPublisher = null;
    this.selectedPublisherChange.emit(null);
    this.selectedPrice = {
      min: null,
      max: null,
      label: ''
    };
    this.selectedPriceChange.emit( {
      min: null,
      max: null,
      label: ''
    });
    this.handleSort();
  }

  async ngOnInit(): Promise<void> {}
}