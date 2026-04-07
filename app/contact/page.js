"use client";

import FullWidthLayout from "@/components/layouts/FullWidthLayout";
import EmailForm from "@/components/common/EmailForm";

export default function Projects() {
  return (
    <FullWidthLayout
      showHero={false}
      showPersistentSidebar={false}
      heroProps={{
        title: "Get In Touch",
        subtitle:
          "For inquiries, collaborations, or more information, feel free to get in touch",
        showIntro: false,
        showCommentedSocialBlock: false,
      }}
    >
      <section id="contact-form">
        <EmailForm formspreeEndpoint="https://mail.api.lindocode.com/contact" />
      </section>
    </FullWidthLayout>
  );
}
