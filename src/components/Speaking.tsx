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
    <section id="speaking" className="min-h-245.5 bg-line pt-9.75 pb-14.25 md:max-lg:min-h-0 md:max-lg:py-24 lg:min-h-[755.63px] lg:pt-[138.19px] lg:pb-[133.34px]">
      <Container className="grid items-center gap-6 lg:min-h-[484.1px] lg:grid-cols-[540.64px_576.36px] lg:gap-30.75">
        <div className="flex flex-col gap-6 lg:gap-9.75">
          <div className="flex flex-col gap-4 lg:gap-9.25">
            <div className="flex flex-col gap-3 lg:gap-3.5">
              <Eyebrow>Speaking &amp; Education</Eyebrow>
              <div className="flex flex-col gap-5.25">
                <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:h-[128.75px] lg:text-[56px] lg:leading-[58.75px]">
                  Bringing awareness
                  <br />
                  <span className="text-purple">to the room.</span>
                </h2>
                <p className="text-[16px] leading-[30.46px] text-[#4A5163] lg:whitespace-nowrap">
                  Dr. Foojan speaks to professional, academic, leadership and <br className="hidden lg:block" />
                  public audiences on psychology, Awareness Integration Theory, <br className="hidden lg:block" />
                  personal development, relationships, mental health and <br className="hidden lg:block" />
                  conscious leadership.
                </p>
              </div>
            </div>
            <div>
              <Button
                href="#contact"
                arrow
                className="h-14! w-64.25 text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
              >
                Invite Dr. Foojan to speak
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:h-13.5 lg:flex-row lg:justify-between lg:gap-6">
            {formats.map((f) => (
              <div key={f.title} className="flex flex-col gap-0.75">
                <p className="font-serif text-[20px] leading-8.5 text-plum-950">{f.title}</p>
                <p className="text-[14px] leading-4.25 text-[#4A5163]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-[10px] border border-[#0B235014] bg-white p-3 md:max-lg:gap-5 md:max-lg:p-6 lg:gap-5.75 lg:p-8">
          <p className="text-[13px] leading-4 font-bold tracking-[1.82px] text-plum-950 uppercase">Signature topics</p>
          <ul className="grid auto-rows-13.25 grid-cols-2 gap-2.5 max-[389px]:auto-rows-[minmax(53px,auto)] md:max-lg:auto-rows-[60px] md:max-lg:gap-3 lg:auto-rows-[52.8px]">
            {topics.map((t) => (
              <li
                key={t}
                className="flex items-center justify-center border border-[#F8E6FF] px-3.75 py-3 text-center font-[Arial,Helvetica,sans-serif] text-[12px] leading-[20.8px] text-[#111111] md:max-lg:justify-start md:max-lg:px-5 md:max-lg:text-left md:max-lg:text-[15px] lg:justify-start lg:text-left lg:text-[13px] lg:leading-normal"
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
