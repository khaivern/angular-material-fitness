import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  exerciseStarted = new Subject<Exercise>();
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 5, calories: 8 },
  ];
  completedExercises: Exercise[] = [];
  private activeExercise: Exercise;

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(id: string) {
    this.activeExercise = this.availableExercises.find(
      (exercise) => exercise.id === id
    );
    this.exerciseStarted.next({ ...this.activeExercise });
  }

  getActiveExercise() {
    return this.activeExercise;
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.activeExercise,
      date: new Date(),
      state: 'completed',
    });
    this.resetActiveExercise();
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.activeExercise,
      duration: this.activeExercise.duration * (progress/ 100),
      calories: this.activeExercise.calories * (progress/ 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.resetActiveExercise();
  }

  private resetActiveExercise() {
    this.activeExercise = null;
    this.exerciseStarted.next(null);
  }

  getAllCompletedExercises() {
    return this.completedExercises;
  }
}
