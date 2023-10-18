import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  playerName: string = '';
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }
}
