import {
  AudioOutlined,
  BookOutlined,
  BulbOutlined,
  FontSizeOutlined,
  LayoutOutlined,
  MailOutlined,
  MenuOutlined,
  MobileOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { HomeField, HomeSectionConfig } from "@/types/components";
import { FieldKind, HomeSection } from "@/types/enums";

const accentHelp = "Shown in the coloured italic style after the heading.";
const boldHelp = "Wrap words in **double stars** to make them bold.";

const text = (name: string, label: string, help?: string): HomeField => ({ name, label, kind: FieldKind.Text, help });
const area = (name: string, label: string, help?: string): HomeField => ({ name, label, kind: FieldKind.TextArea, help });
const link = (name: string, label: string, help?: string): HomeField => ({ name, label, kind: FieldKind.Link, help });
const optional = (field: HomeField): HomeField => ({ ...field, optional: true });
const button = (name: string, label: string): HomeField => ({
  name,
  label,
  kind: FieldKind.Group,
  fields: [text("label", "Button text"), link("href", "Link")],
});
const heading = (prefix = ""): HomeField[] => [
  text(`${prefix}kicker`, "Small line above the heading"),
  text(`${prefix}heading`, "Heading"),
  text(`${prefix}heading_accent`, "Heading (italic part)", accentHelp),
];

export const homeSections: HomeSectionConfig[] = [
  {
    key: HomeSection.Header,
    label: "Header menu",
    description: "Top menu, dropdown links and the Invite button.",
    icon: <MenuOutlined />,
    cards: [
      {
        title: "Menu items",
        description: "Use a #section for homepage sections, /page for site pages, or a full https:// link.",
        fields: [
          {
            name: "menu",
            label: "Menu item",
            kind: FieldKind.List,
            itemLabel: "Menu item",
            fields: [
              text("label", "Label"),
              link("href", "Link"),
              { name: "visible", label: "Show on website", kind: FieldKind.Toggle },
              { name: "children", label: "Dropdown link", kind: FieldKind.List, itemLabel: "Dropdown link", optional: true, fields: [text("label", "Label"), link("href", "Link")] },
            ],
          },
        ],
      },
    ],
  },
  {
    key: HomeSection.Hero,
    label: "Hero",
    description: "Main heading, buttons and portrait.",
    icon: <PictureOutlined />,
    cards: [
      {
        title: "Text",
        fields: [
          text("kicker", "Small line above the heading"),
          text("heading", "Heading (first line)"),
          text("heading_accent", "Heading (italic second line)", accentHelp),
          area("paragraph", "Paragraph"),
          text("footnote", "Small line at the bottom"),
        ],
      },
      {
        title: "Buttons",
        fields: [
          text("primary_button_label", "Dark button text"),
          link("primary_button_href", "Dark button link"),
          text("secondary_button_label", "Outline button text"),
          link("secondary_button_href", "Outline button link"),
        ],
      },
      {
        title: "Portrait",
        fields: [
          { name: "image_url", label: "Photo", kind: FieldKind.Image, aspect: 657 / 760, outputWidth: 1400 },
          text("image_alt", "Photo description (for screen readers)"),
          text("vertical_text", "Vertical text on the photo"),
          text("caption", "Caption on the photo"),
        ],
      },
    ],
  },
  {
    key: HomeSection.Ticker,
    label: "Ticker",
    description: "The moving navy strip under the hero.",
    icon: <FontSizeOutlined />,
    cards: [{ title: "Words", fields: [{ name: "items", label: "Word", kind: FieldKind.TextList, itemLabel: "Word" }] }],
  },
  {
    key: HomeSection.About,
    label: "About",
    description: "“Understanding the mind”, text and the 4 boxes.",
    icon: <UserOutlined />,
    cards: [
      {
        title: "Text",
        fields: [...heading(), { name: "paragraphs", label: "Paragraph", kind: FieldKind.TextList, itemLabel: "Paragraph", help: boldHelp }, button("link", "Link under the text")],
      },
      {
        title: "Boxes",
        fields: [{ name: "proof", label: "Box", kind: FieldKind.List, itemLabel: "Box", fields: [text("title", "Title"), text("label", "Small line")] }],
      },
    ],
  },
  {
    key: HomeSection.Ait,
    label: "AIT",
    description: "Awareness Integration Theory and its 6 steps.",
    icon: <BulbOutlined />,
    cards: [
      {
        title: "Text",
        fields: [...heading(), { name: "paragraphs", label: "Paragraph", kind: FieldKind.TextList, itemLabel: "Paragraph" }, button("button", "Gold button")],
      },
      {
        title: "Steps",
        fields: [
          {
            name: "steps",
            label: "Step",
            kind: FieldKind.List,
            itemLabel: "Step",
            fields: [text("number", "Number"), text("eyebrow", "Small line"), text("title", "Title"), area("text", "Text")],
          },
          area("caption", "Caption under the steps"),
        ],
      },
    ],
  },
  {
    key: HomeSection.Speaking,
    label: "Speaking",
    description: "Speaking heading, photo card and inquiry link.",
    icon: <AudioOutlined />,
    cards: [
      { title: "Heading", fields: [...heading(), area("paragraph", "Paragraph")] },
      {
        title: "Photo card",
        fields: [
          { name: "image_url", label: "Photo", kind: FieldKind.Image, aspect: 1282 / 720, outputWidth: 2000 },
          text("image_alt", "Photo description (for screen readers)"),
          link("card_href", "Card link", "#contact opens the Invite Dr. Foojan form."),
          text("card_label", "Label at the top"),
          text("card_heading", "Heading (first line)"),
          text("card_heading_line2", "Heading (second line)"),
          text("card_heading_accent", "Heading (italic end of second line)"),
          area("card_text", "Text"),
          text("card_hook", "Gold line"),
        ],
      },
      { title: "Under the card", fields: [area("footer_text", "Text"), button("footer_link", "Link")] },
    ],
  },
  {
    key: HomeSection.Publications,
    label: "Books & Research",
    description: "Heading, the 2 panels and the note.",
    icon: <BookOutlined />,
    cards: [
      { title: "Heading", fields: [...heading(), area("paragraph", "Paragraph")] },
      {
        title: "Panels",
        fields: [
          {
            name: "panels",
            label: "Panel",
            kind: FieldKind.List,
            itemLabel: "Panel",
            fields: [text("index", "Small line"), text("title", "Title"), area("text", "Text"), button("link", "Link")],
          },
          optional(area("note", "Note under the panels")),
        ],
      },
    ],
  },
  {
    key: HomeSection.Media,
    label: "Media",
    description: "Media Library, Inner Voice podcast, YouTube and Substack.",
    icon: <PlayCircleOutlined />,
    cards: [
      {
        title: "Media Library heading",
        fields: [...heading(), area("paragraph", "Paragraph"), { name: "tabs", label: "Tab", kind: FieldKind.List, itemLabel: "Tab", fields: [text("label", "Label"), link("href", "Link")] }],
      },
      {
        title: "Inner Voice podcast",
        fields: [
          ...heading("podcast_"),
          area("podcast_text", "Text"),
          button("podcast_primary", "Light button"),
          { name: "podcast_links", label: "Podcast link", kind: FieldKind.List, itemLabel: "Podcast link", fields: [text("label", "Label"), link("href", "Link")] },
          { name: "podcast_image_url", label: "Cover image", kind: FieldKind.Image, aspect: 1, outputWidth: 900 },
          text("podcast_image_alt", "Cover description (for screen readers)"),
          {
            name: "episodes",
            label: "Episode",
            kind: FieldKind.List,
            itemLabel: "Episode",
            fields: [text("label", "Small line (number / guest)"), text("title", "Title"), button("link", "Link")],
          },
          area("podcast_note", "Note at the bottom"),
        ],
      },
      {
        title: "YouTube",
        fields: [
          ...heading("youtube_"),
          area("youtube_text", "Text next to the heading"),
          link("youtube_href", "YouTube channel link"),
          text("youtube_eyebrow", "Card: small line"),
          text("youtube_title", "Card: title"),
          area("youtube_card_text", "Card: text"),
          text("youtube_cta", "Card: link text"),
          text("youtube_mark", "Card: text under the logo"),
        ],
      },
      {
        title: "Substack",
        fields: [
          ...heading("substack_"),
          area("substack_text", "Text"),
          link("substack_href", "Substack link"),
          text("substack_link_label", "Link text"),
          text("substack_name", "Big word in the right box"),
          text("substack_byline", "Small line under it"),
        ],
      },
    ],
  },
  {
    key: HomeSection.Quote,
    label: "Quote",
    description: "The quote in the purple band.",
    icon: <FontSizeOutlined />,
    cards: [{ title: "Quote", fields: [text("kicker", "Small line above"), area("quote", "Quote"), text("author", "Name under the quote")] }],
  },
  {
    key: HomeSection.Mira,
    label: "Foojan App & Mira",
    description: "Heading, the 2 product cards and the note.",
    icon: <MobileOutlined />,
    cards: [
      { title: "Heading", fields: [...heading(), area("paragraph", "Paragraph")] },
      {
        title: "Cards",
        fields: [
          {
            name: "products",
            label: "Card",
            kind: FieldKind.List,
            itemLabel: "Card",
            fields: [
              { name: "image_url", label: "Phone image", kind: FieldKind.Image, aspect: 591 / 390, outputWidth: 1200, freeShape: true },
              text("image_alt", "Image description (for screen readers)"),
              text("kicker", "Small line"),
              text("title", "Title (first line)"),
              optional(text("title_line2", "Title (second line)")),
              { name: "paragraphs", label: "Paragraph", kind: FieldKind.TextList, itemLabel: "Paragraph" },
              optional(area("highlight", "Bold line")),
              button("link", "Link"),
              { name: "link_text_width", label: "Link text width (px, from the design)", kind: FieldKind.Number },
            ],
          },
          area("note", "Note under the cards"),
        ],
      },
    ],
  },
  {
    key: HomeSection.Invite,
    label: "Invite form",
    description: "The Invite Dr. Foojan speaking inquiry popup.",
    icon: <MailOutlined />,
    cards: [{ title: "Text", fields: [...heading(), area("paragraph", "Paragraph"), text("form_title", "Form title"), text("submit_label", "Send button text")] }],
  },
  {
    key: HomeSection.Footer,
    label: "Footer",
    description: "Tagline, Explore links, Stay connected and copyright.",
    icon: <LayoutOutlined />,
    cards: [
      {
        title: "Footer",
        fields: [
          text("tagline", "Line under the logo"),
          text("explore_title", "Explore heading"),
          { name: "explore_links", label: "Link", kind: FieldKind.List, itemLabel: "Link", fields: [text("label", "Label"), link("href", "Link")] },
          text("connect_title", "Stay connected heading"),
          area("connect_text", "Stay connected text"),
          button("connect_link", "Stay connected link"),
          text("copyright", "Copyright line"),
          area("note", "Note at the bottom right"),
        ],
      },
    ],
  },
];

export const findHomeSection = (key: string) => homeSections.find((section) => section.key === key);
