import { ErrorHandler, inject, Injectable } from "@angular/core";
import { ErrorService } from "../service/error.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    errorService = inject(ErrorService);

    handleError(error: any): void {
       this.errorService.handleGlobalError(error);
       console.error('Global Error: ', error);
    }

}