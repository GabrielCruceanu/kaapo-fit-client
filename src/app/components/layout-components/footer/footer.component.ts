import { Component } from '@angular/core';
import { SocialLinks, TermsLinks } from '#/app/content/links';
import { LinkInterface } from '#/app/ts/interface';
import { FooterContent } from '#/app/content/footer';
import { ButtonVariants } from '#/app/ts/enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerContent = FooterContent;
  socialLinks: LinkInterface[] = SocialLinks;
  termsLinks: LinkInterface[] = TermsLinks;
  buttonVariants = ButtonVariants;
}
