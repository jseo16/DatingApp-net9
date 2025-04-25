import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private destroyed = inject(DestroyRef);
  member?: Member;
  images: GalleryItem[] = [];

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
          next: (member) => {
            this.member = member;
            member.photos.map((p) => {
              this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
            });
          },
        });
    }
  }
}
