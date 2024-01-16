import { Directive, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { Subscription } from "rxjs";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[onlyPositive]"
})
export class OnlyPositiveDirective implements OnInit, OnDestroy {
  subscriber$: Subscription;

  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    this.subscriber$ = fromEvent(this.element.nativeElement, "input").subscribe(
      (event: KeyboardEvent) => {
        if (this.element.nativeElement.value.includes("-")) {
          this.element.nativeElement.value = this.element.nativeElement.value.replace(
            /-/g,
            ""
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }
}
