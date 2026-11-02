import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditProfileFab from "@/components/EditProfileFab";
import BentoGrid from "@/components/BentoGrid";
import LogoutButton from "@/components/LogoutButton";
import { getValidWidgetSize } from "@/lib/widgets";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username: username.toLowerCase() },
    select: { name: true, title: true, bio: true },
  });

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  const displayName = profile.name || `@${username}`;
  const title = `${displayName}'s Bento Profile`;
  const description =
    profile.bio || profile.title || `Check out ${displayName}'s interactive developer card on Bento Builder.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1024,
          height: 537,
          alt: `${displayName} on Bento Builder`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username: username.toLowerCase() },
    include: { widgets: true },
  });

  if (!profile) {
    notFound();
  }

  const session = await getSession();
  const isOwner = session?.user?.id === profile.userId;

  const widgets = [...profile.widgets]
    .sort((a, b) => a.position - b.position)
    .map((widget) => ({
      id: widget.id,
      type: widget.type,
      sizePreset: getValidWidgetSize(widget.type, widget.sizePreset),
      config: widget.config && typeof widget.config === "object" ? widget.config : {},
    }));

  return (
    <div className="antialiased min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background">
      <BentoGrid
        profile={profile}
        isEditing={false}
        widgetData={widgets}
        widgets={widgets.map((widget) => widget.type)}
        widgetSizes={Object.fromEntries(widgets.map((widget) => [widget.type, widget.sizePreset]))}
        city={String((widgets.find((widget) => widget.type === "location")?.config as { city?: string } | undefined)?.city || "Kyiv, UA")}
        timezone={String((widgets.find((widget) => widget.type === "location")?.config as { timezone?: string } | undefined)?.timezone || "Europe/Kyiv")}
      />

      {isOwner && <EditProfileFab />}
      {session && <LogoutButton />}
    </div>
  );
}
