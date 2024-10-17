import { Component, OnDestroy, OnInit } from '@angular/core';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesType } from '../models/learning-app/categories-type';
import { PopularLecturersType } from '../models/learning-app/popular-lecturers-type';
import { CurrentlyAttendingType } from '../models/learning-app/currently-attending-type';
import { LearningAppService } from '../services/learning-app.service';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public learningAppCurrentlyAttending: CurrentlyAttendingType[] = [];
  public learningAppCategories: CategoriesType[] = [];
  public learningAppPopularLecturers: PopularLecturersType[] = [];

  constructor(
    private learningAppService: LearningAppService,
  ) {}

  ngOnInit() {
    this.learningAppService.getCurrentlyAttendingList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.learningAppCurrentlyAttending = data
    );
    this.learningAppService.getCategoriesList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.learningAppCategories = data
    );
    this.learningAppService.getPopularLecturersList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.learningAppPopularLecturers = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
