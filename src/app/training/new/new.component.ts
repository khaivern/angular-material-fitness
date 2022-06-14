import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  exercises: Exercise[];
  newExerciseForm: FormGroup;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getExercises();
    this.newExerciseForm = new FormGroup({
      selectedExercise: new FormControl('burpees'),
    });
  }

  onSubmitExercise() {
    this.trainingService.startExercise(this.newExerciseForm.get('selectedExercise').value)
  }
}
