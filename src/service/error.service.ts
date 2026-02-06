import { HttpErrorResponse, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { showResponseFailure } from "../app/response/sweetAlert";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    handleHttpError (error: HttpErrorResponse) {
        const message = this.getHttpMessage(error);
        showResponseFailure(message);
        this.logError(error);
    }

    handleGlobalError (error: any) {
        this.logError(error);
    }

    private getHttpMessage (error: HttpErrorResponse) {
        switch (error.status) {
            case HttpStatusCode.BadRequest:
                return "Bad Request";
            case HttpStatusCode.Unauthorized:
                return "Unauthorized";
            case HttpStatusCode.Forbidden:
                return "Forbidden";
            case HttpStatusCode.NotFound:
                return "Not Found";
            case HttpStatusCode.InternalServerError:
                return "Internal Server Error";
            default: return "Unexpected error occured";
        }
    }

    private logError (error : any) {
        console.error('Loggin to external service: ', error);
    }
}