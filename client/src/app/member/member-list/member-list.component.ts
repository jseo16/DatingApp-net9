import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Member } from '../../_models/member';
import { MemberCardComponent } from '../../members/member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  private destroyed = inject(DestroyRef);
  private membersService = inject(MembersService);
  members: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService
      .getMembers()
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyed))
      .subscribe({
        next: (members) => (this.members = members),
      });
  }
}
