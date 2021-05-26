import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

export class ToastrServiceStub implements Partial<ToastrService> {
  success(message: string) {
    return undefined;
  }

  info(message: string) {
    return undefined;
  }

  warning(message: string) {
    return undefined;
  }

  error(message: string) {
    return undefined;
  }

  remove(id: number) {
    return true;
  }
}
