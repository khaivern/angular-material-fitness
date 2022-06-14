import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
})
export class CurrentComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: any;
  activeExercise: Exercise;
  trainingSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startTimer();
    this.trainingSubscription = this.trainingService.exerciseStarted.subscribe(
      (exercise) => {
        console.log({ exercise });
        if (exercise) {
          this.activeExercise = exercise;
        }
      }
    );
    this.activeExercise = this.trainingService.getActiveExercise();
  }

  private startTimer() {
    const step =
      (this.trainingService.getActiveExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress >= 100 ? this.handleSuccess() : this.progress++;
    }, step);
  }

  private handleSuccess() {
    this.trainingService.completeExercise();
    return clearInterval(this.timer);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.trainingService.cancelExercise(this.progress)
        : this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }
}
