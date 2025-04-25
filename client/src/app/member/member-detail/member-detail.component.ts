import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private destroyed = inject(DestroyRef);
  member?: Member;

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username')!;
    if (username) {
      this.memberService
        .getMember(username)
        .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyed))
        .subscribe({
          next: (member) => (this.member = member),
        });
    }
  }
}
