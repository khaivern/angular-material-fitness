import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean = false;
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingSubscription = this.trainingService.exerciseStarted.subscribe(
      (exercise) => {
        this.ongoingTraining = !!exercise;
      }
    );
  }

  ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }
}
