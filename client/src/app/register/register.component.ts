import { Component, DestroyRef, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  destroyRef = inject(DestroyRef);
  cancelRegister = output<boolean>();
  model: any = {};

  register() {
    this.accountService
      .register(this.model)
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.cancel(),
        error: (error) => this.toastr.error(error.error),
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
