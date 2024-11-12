import type { Database } from "@gigflow/supabase/types";
import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gigflow/ui/dropdown-menu";
import { Icons } from "@gigflow/ui/icons";
import Image from "next/image";
import Link from "next/link";
import DeleteExperienceButton from "./delete-experience-button";

const ExperienceCard = ({
  experience,
}: {
  experience: Database["public"]["Tables"]["freelancer_experiences"]["Row"];
}) => {
  const { id, title, description, thumbnail_url } = experience;

  return (
    <div>
      <div
        className="grid grid-flow-row gap-y-4 mb-8 rounded-[10px] bg-white
    [grid-template-areas:'cardImage'_'cardContent'_'cardTags'_'cardActions'] [grid-template-columns:auto]
    md:mb-10 md:gap-y-6
    md:[grid-template-areas:'cardDragIcon_cardImage_cardContent_cardContent'_'._cardTags_cardTags_cardActions']
    md:[grid-template-columns:auto_264px_1fr_auto]"
      >
        <div className="[grid-area:cardDragIcon] mr-1">
          <Icons.DragIndicator />
        </div>
        <div className="[grid-area:cardImage] md:mr-5">
          <div className="relative aspect-[4/3] w-full rounded-[10px] overflow-hidden">
            <Image
              src={thumbnail_url || ""}
              alt="project cover"
              fill
              sizes="(max-width: 768px) 100vw, 264px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
        <div className="[grid-area:cardContent] flex flex-col gap-2">
          <div>badge</div>
          <h2 className="text-xl font-semibold tracking-[-.25px] leading-[1.4]">
            {title}
          </h2>
          <div className="text-[#4A5264] break-words xl:line-clamp-2">
            {description}
          </div>
        </div>
        <div className="[grid-area:cardTags] flex items-center flex-wrap gap-2">
          <Badge>badge</Badge>
          <Badge>badge</Badge>
        </div>
        <div className="[grid-area:cardActions] flex items-center justify-start md:justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="hover:bg-secondary"
              >
                <Icons.MoreHoriz className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align="end">
              <DropdownMenuItem asChild>
                <Link href={`/profile/experiences/${id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteExperienceButton experienceId={id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
