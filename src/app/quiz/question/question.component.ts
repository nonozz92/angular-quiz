import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../shared/services/quiz.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  get quizContent() {
    return this.quizService.quizContent;
  }

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const categoryIdStr = this.route.snapshot.paramMap.get('categoryId');
    if (categoryIdStr) {
      const categoryId = +categoryIdStr;
      this.quizService.getQuizContent(categoryId).then(() => {
        this.cdr.detectChanges();
      });
    }
  }
}
