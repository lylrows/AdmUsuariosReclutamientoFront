import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public _router: Router, public _injector: Injector, public _messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        // Operation failed; error is an HttpErrorResponse
        (error: HttpErrorResponse) => {
          console.log(error)
          if (error.status === 401) {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No tiene acceso a la pantalla solicitada o su sesión ya expiró'
            });

            this._router.navigate(['/auth/login']);
          } else {
            console.log('Ocurrió un error durante el proceso, intente nuevamente.');
            // this._messageService.add({
            //   severity: 'error',
            //   summary: 'Error',
            //   detail: 'Ocurrió un error durante el proceso, intente nuevamente.'
            // });
          }
        }
      )
    );
  }
}
