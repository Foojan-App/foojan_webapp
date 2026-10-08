import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/utils/svg";
import Logo from "./Logo";
import { Container } from "./ui";

const columns = [
  { title: "Explore", links: ["About", "AIT", "Books & Publications", "Experience"] },
  { title: "Connect", links: ["Media & Press", "Speaking", "Contact", "Blog"] },
  { title: "Her Work", links: ["IAII", "Foojan App", "Mira", "Psychotherapy"] },
];

const socials = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "YouTube", Icon: YouTubeIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "X", Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="bg-plum-950 pt-14.75 pb-[58.54px] text-white lg:min-h-[457.02px] lg:pt-20 lg:pb-[29.97px]">
      {/* footer: 1440×457.02, #1A002B; top row 1207.18×257.28, 80px from the top, columns 65px apart;
          mobile: 390×1160, content 350×1042.46 at 59px — top group 323.48×857.46 (brand + 3 link columns, 40px apart), 41px gap, bottom bar */}
      <Container>
        <div className="flex w-[323.48px] max-w-full flex-col gap-10 lg:w-auto lg:flex-row lg:gap-16.25">
          {/* brand column: 323.48×257.28 = logo (164×99) + 23px + tagline & socials (135.28) */}
          <div className="flex flex-col gap-5.75 lg:w-[323.48px]">
            <Logo light />
            {/* tagline + socials: 323.48×135.28, 27px gap */}
            <div className="flex flex-col gap-6.75">
              {/* tagline: Inter 14.5px / 24.65px, #E0E0E0, 323.48×66.28 box as in Figma (3 lines slightly overflow it); same breaks on mobile; phones narrower than 390 let it wrap */}
              <p className="text-[14.5px] leading-[24.65px] text-[#E0E0E0] min-[390px]:h-[66.28px] min-[390px]:whitespace-nowrap">
                Psychotherapist · Author · Educator · <br />
                International Speaker · Originator of Awareness <br />
                Integration Theory
              </p>
              {/* socials: 250×42 row, 10px gap → five 42×42 boxes */}
              <ul className="flex gap-2.5">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <a
                      href="#"
                      aria-label={label}
                      className="grid size-10.5 place-items-center rounded-md border border-[#FFFFFF33] text-white transition hover:border-white/60"
                    >
                      <Icon className="size-4.25" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* link columns: desktop in a row, 65px apart; mobile stacked 40px apart */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16.25">
            {columns.map((col) => (
              // link column: 229.56×160.06, heading and links 18px apart
              <div key={col.title} className="flex flex-col gap-4.5 lg:w-[229.56px]">
                <p className="text-[12.5px] leading-[13.5px] font-bold tracking-[2px] text-white uppercase">{col.title}</p>
                {/* links: 229.56×128.56 — desktop ~23px rows (17px text 3px from the top), 12.19px apart (derived);
                    mobile Inter 14.5px / 24.65px lines, 10px apart (derived from the 128.56 box) */}
                <ul className="flex flex-col gap-2.5 lg:gap-[12.19px]">
                  {col.links.map((l) => (
                    <li key={l} className="flex items-center lg:h-5.75">
                      <a href="#" className="text-[14.5px] leading-[24.65px] text-[#E0E0E0] lg:leading-4.25 transition hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar: 1240×49, 1px #FFFFFF1A top border, 40.77px below the top row (mobile: 350×144, 41px below);
            copyright (left) and address (right): Inter 13px #E0E0E0 in 16px boxes, 30px from the bar top;
            mobile: centred, address above copyright, Inter 13px / 22.1px — text group 350×114 (2+2 lines, 25.6px gap) 29px below the border */}
        <div className="mt-10.25 flex h-36 flex-col-reverse gap-[25.6px] border-t border-[#FFFFFF1A] pt-7.25 text-center text-[13px] leading-[22.1px] text-[#E0E0E0] lg:mt-[40.77px] lg:leading-4 lg:h-12.25 lg:flex-row lg:justify-between lg:gap-3 lg:text-left">
          <p>© 2026 Dr. Foojan Zeine, Psy.D., LMFT. All rights reserved.</p>
          <p>300 S. El Camino Real, Suite 216, San Clemente, CA 92672</p>
        </div>
      </Container>
    </footer>
  );
}
