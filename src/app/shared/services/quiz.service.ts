import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://localhost:3000';
  quizContent: any[] = [];
  playerAnswers: { questionId: number; answer: string }[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find(
        (q) => q.id === this.playerAnswers[i].questionId
      );
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (
          currentAnswer.isCorrect &&
          this.playerAnswers[i].answer === currentAnswer.answerLabel
        ) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find(
      (a) => a.questionId === questionId
    );
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({ questionId, answer });
  }

  getQuizContent(categoryId: number): Promise<void> {
    this.quizContent = [];
    return new Promise((resolve, reject) => {
      this.http
        .get(`http://localhost:3000/questions?categoryId=${categoryId}`)
        .subscribe(
          (questions: any) => {
            const contentPromises = questions.map((question: any) => {
              return this.http
                .get(`http://localhost:3000/answers?questionId=${question.id}`)
                .toPromise()
                .then((answers: any) => {
                  return {
                    id: question.id,
                    question: question.questionLabel,
                    answers,
                  };
                });
            });

            Promise.all(contentPromises)
              .then((contents) => {
                this.quizContent = contents;
                resolve();
              })
              .catch((error) => reject(error));
          },
          (error) => reject(error)
        );
    });
  }

  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }
  setCategories(categories: any[]) {
    this.categories = categories;
  }

  getCategoryByName(categoryName: string) {
    return this.categories.find((cat: any) => cat.name === categoryName);
  }
}
