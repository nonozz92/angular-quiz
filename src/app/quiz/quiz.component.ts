import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  categoryName = '';

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      if (params['categoryName']) {
        this.categoryName = params['categoryName'];

        const category = this.quizService.getCategoryByName(this.categoryName);
        if (category) {
          this.quizService.getQuizContent(category.id);
        }
      }
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}
