import { Button, Container, Eyebrow } from "./ui";

const formats = [
  { title: "Keynotes", body: "Conferences & events" },
  { title: "Workshops", body: "Professional training" },
  { title: "Academic", body: "University lectures" },
];

const topics = [
  "Awareness Integration Theory",
  "Awakened Leadership",
  "Mental Health & Resilience",
  "Relationships & Human Behavior",
  "Intentional Parenting",
  "AI & Mental Health",
  "Personal Growth",
  "Professional Education",
];

export default function Speaking() {
  return (
    <section id="speaking" className="min-h-245.5 bg-line pt-9.75 pb-14.25 lg:min-h-[755.63px] lg:pt-[138.19px] lg:pb-[133.34px]">
      {/* section #ECE6F0 — desktop 1440×755.63, content 1240×484.1 = left 540.64 + 123px gap + card 576.36;
          mobile 390×982, content 350×886 at 39px (57px below), left and card stacked 24px apart */}
      <Container className="grid items-center gap-6 lg:min-h-[484.1px] lg:grid-cols-[540.64px_576.36px] lg:gap-30.75">
        {/* left column — desktop 540.64×484.1 = text & button (391.1) + 39px gap + formats (54); mobile 350×566, 24px gap */}
        <div className="flex flex-col gap-6 lg:gap-9.75">
          {/* text + button: 540.64×391.1, 37px gap */}
          <div className="flex flex-col gap-4 lg:gap-9.25">
            {/* text group: desktop 540.64×298.1, 14px gap; mobile 350×284, 12px gap */}
            <div className="flex flex-col gap-3 lg:gap-3.5">
              <Eyebrow>Speaking &amp; Education</Eyebrow>
              {/* heading + paragraph: 540.64×262.1, 21px gap */}
              <div className="flex flex-col gap-5.25">
                {/* heading: Lora 500 — desktop 56px / 58.75px in a 128.75px box; mobile 32px / 120% (derived from the 284px group) */}
                <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:h-[128.75px] lg:text-[56px] lg:leading-[58.75px]">
                  Bringing awareness
                  <br />
                  <span className="text-purple">to the room.</span>
                </h2>
                {/* paragraph: Inter 16px / 30.46px, #4A5163; line breaks match Figma on large screens */}
                <p className="text-[16px] leading-[30.46px] text-[#4A5163] lg:whitespace-nowrap">
                  Dr. Foojan speaks to professional, academic, leadership and <br className="hidden lg:block" />
                  public audiences on psychology, Awareness Integration Theory, <br className="hidden lg:block" />
                  personal development, relationships, mental health and <br className="hidden lg:block" />
                  conscious leadership.
                </p>
              </div>
            </div>
            <div>
              {/* button: 257×56; text Inter 600, 14.5px, 0.14px tracking */}
              <Button
                href="#contact"
                arrow
                className="h-14! w-64.25 text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
              >
                Invite Dr. Foojan to speak
              </Button>
            </div>
          </div>
          {/* formats — desktop: 540.64×54, space-between; mobile: 350×186, stacked 12px apart */}
          <div className="flex flex-col gap-3 lg:h-13.5 lg:flex-row lg:justify-between lg:gap-6">
            {formats.map((f) => (
              // each item hugs its text; title and subtitle 3px apart
              <div key={f.title} className="flex flex-col gap-0.75">
                <p className="font-serif text-[20px] leading-8.5 text-plum-950">{f.title}</p>
                <p className="text-[14px] leading-4.25 text-[#4A5163]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* topics card: white, 1px #0B235014 border, radius 10 — desktop 576.36×346.2, 32px padding, 23px gap; mobile 350×296, 12px padding, title and grid 12px apart, grid 324×242 (157×53 boxes, 10px gaps) */}
        <div className="flex flex-col gap-3 rounded-[10px] border border-[#0B235014] bg-white p-3 lg:gap-5.75 lg:p-8">
          <p className="text-[13px] leading-4 font-bold tracking-[1.82px] text-plum-950 uppercase">Signature topics</p>
          {/* topics grid: 510.36×241.2, 10px gaps → 250.18×52.8 boxes */}
          <ul className="grid auto-rows-13.25 grid-cols-2 gap-2.5 lg:auto-rows-[52.8px]">
            {topics.map((t) => (
              // topic: 250.18×52.8, 1px #F8E6FF border; text Arial 13px #111111 (Arial is what Figma specifies here), 15px padding
              <li
                key={t}
                className="flex items-center justify-center border border-[#F8E6FF] px-3.75 py-3 text-center font-[Arial,Helvetica,sans-serif] text-[12px] leading-[20.8px] text-[#111111] lg:justify-start lg:text-left lg:text-[13px] lg:leading-normal"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
