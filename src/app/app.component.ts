import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Observer, Subscription } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

// Ouvrez la console en cliquant sur console en bas à gauche de la fenêtre preview
export class AppComponent implements OnInit, OnDestroy {
  private subscription1?: Subscription;
  private subscription2?: Subscription;

  ngOnInit() {
    const observable = new Observable((observer: Observer<any>) => {
      observer.next(2);
      observer.next(3);
      observer.next(4);
      setTimeout(() => {
        observer.next(5);
        observer.error(new Error("oops"));
        observer.next(6);
      }, 2000);
    });

    const observer: Observer<any> = {
      next: x => console.log("[next] : ", x),
      complete: () => console.log("complete"),
      error: x => console.log("[error] : ", x)
    };

    this.subscription1 = observable.subscribe(observer);

    // Notation raccourcie :
    this.subscription2 = observable.subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e)
    });
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
