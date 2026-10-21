import type { HomeMediaContent } from "@/services/interface";

export const mediaContent: HomeMediaContent = {
  kicker: "05 / The public media library",
  heading: "Listen. Watch.",
  heading_accent: "Discover.",
  paragraph: "Explore Dr. Foojan’s public conversations and published perspectives across Inner Voice, YouTube, and Substack.",
  tabs: [
    { label: "PODCAST ↘", href: "#podcast" },
    { label: "YOUTUBE ↘", href: "#youtube" },
    { label: "SUBSTACK ↘", href: "#substack" },
  ],
  podcast_kicker: "InnerVoice · A Heartfelt Chat",
  podcast_heading: "Pull up a chair.",
  podcast_heading_accent: "Let’s talk about life.",
  podcast_text:
    "Honest conversations about healing, relationships, and being human. Join Dr. Foojan and her guests as they explore the experiences that shape us, the choices that move us forward, and the possibilities ahead.",
  podcast_primary: { label: "Watch InnerVoice ↗", href: "https://www.youtube.com/user/DrFoojan" },
  podcast_links: [
    { label: "Apple Podcasts ↗", href: "#" },
    { label: "iHeart ↗", href: "https://www.iheart.com/podcast/269-inner-voice-heartfelt-chat-78360107/" },
    { label: "Spotify ↗", href: "https://open.spotify.com/show/7t7zMdcqTfdJcFTeqeNrm3" },
  ],
  podcast_image_url: "/images/home/inner-voice-cover.png",
  podcast_image_alt: "Inner Voice podcast with Dr. Foojan portrait and Dr. Foojan Zeine logo",
  episodes: [
    { label: "01 / Dr. Jeffrey Smith", title: "What actually creates change?", link: { label: "Listen to the Conversation ↗", href: "#" } },
    { label: "02 / Dr. Anna Marie Frank", title: "A kinder relationship with yourself.", link: { label: "Listen to the Conversation ↗", href: "#" } },
    { label: "03 / Dr. John Gray", title: "Love, connection & independence.", link: { label: "Listen to the Conversation ↗", href: "#" } },
  ],
  podcast_note:
    "InnerVoice brings Dr. Foojan’s work into an intimate conversational format, connecting psychology, relationships, personal growth and everyday life.",
  youtube_kicker: "06 / Watch & listen",
  youtube_heading: "Conversations that inspire",
  youtube_heading_accent: "awareness, connection, and change.",
  youtube_text:
    "Explore Dr. Foojan’s YouTube channel for videos and discussions on self-awareness, relationships, emotional well-being, and personal growth.",
  youtube_href: "https://www.youtube.com/user/DrFoojan",
  youtube_eyebrow: "Dr. Foojan Zeine · YouTube",
  youtube_title: "Dr. Foojan YouTube Channel",
  youtube_card_text: "Watch thoughtful conversations, practical perspectives, and insights designed to deepen understanding and inspire positive change.",
  youtube_cta: "Visit Dr. Foojan’s YouTube channel ↗",
  youtube_mark: "Watch on YouTube",
  substack_kicker: "Substack · Writing & Reflections",
  substack_heading: "Ideas to explore.",
  substack_heading_accent: "Perspectives to carry forward.",
  substack_text: "Read Dr. Foojan’s writing and reflections on self-awareness, relationships, and personal growth, all in one place.",
  substack_href: "https://substack.com/@drfoojanzeine",
  substack_link_label: "Explore Dr. Foojan on Substack",
  substack_name: "Substack",
  substack_byline: "Dr. Foojan Zeine",
};
