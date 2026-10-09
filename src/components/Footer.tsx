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
      <Container>
        <div className="flex w-[323.48px] max-w-full flex-col gap-10 md:max-lg:w-auto md:max-lg:gap-12 lg:w-auto lg:flex-row lg:gap-16.25">
          <div className="flex flex-col gap-5.75 lg:w-[323.48px]">
            <Logo light />
            <div className="flex flex-col gap-6.75">
              <p className="text-[14.5px] leading-[24.65px] text-[#E0E0E0] max-[389px]:[&_br]:hidden min-[390px]:h-[66.28px] min-[390px]:whitespace-nowrap">
                Psychotherapist · Author · Educator · <br />
                International Speaker · Originator of Awareness <br />
                Integration Theory
              </p>
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

          <div className="flex flex-col gap-10 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-8 lg:flex-row lg:gap-16.25">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4.5 lg:w-[229.56px]">
                <p className="text-[12.5px] leading-[13.5px] font-bold tracking-[2px] text-white uppercase">{col.title}</p>
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

        <div className="mt-10.25 flex h-36 flex-col-reverse gap-[25.6px] md:max-lg:mt-12 md:max-lg:h-auto md:max-lg:flex-row md:max-lg:justify-between md:max-lg:gap-6 md:max-lg:text-left border-t border-[#FFFFFF1A] pt-7.25 text-center text-[13px] leading-[22.1px] text-[#E0E0E0] lg:mt-[40.77px] lg:leading-4 lg:h-12.25 lg:flex-row lg:justify-between lg:gap-3 lg:text-left">
          <p>© 2026 Dr. Foojan Zeine, Psy.D., LMFT. All rights reserved.</p>
          <p>300 S. El Camino Real, Suite 216, San Clemente, CA 92672</p>
        </div>
      </Container>
    </footer>
  );
}
