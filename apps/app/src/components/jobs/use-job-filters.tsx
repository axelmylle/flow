import { Avatar } from "@gigflow/ui/avatar";
import { BlurImage } from "@gigflow/ui/blur-image";
import { useRouterStuff } from "@gigflow/ui/hooks";
import { Icons } from "@gigflow/ui/icons";
import { useMemo } from "react";
import TagBadge from "./tag-badge";

// Mock data
const mockDomains = [
  { slug: "example.com", count: 100 },
  { slug: "test.com", count: 50 },
  { slug: "demo.com", count: 25 },
];

const mockTags = [
  { id: "1", name: "Important", color: "red", count: 30 },
  { id: "2", name: "Urgent", color: "blue", count: 20 },
  { id: "3", name: "Follow-up", color: "green", count: 15 },
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "/john.jpg",
    count: 40,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "/jane.jpg",
    count: 35,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    image: "/bob.jpg",
    count: 25,
  },
];

export function useLinkFilters() {
  const domains = useDomainFilterOptions();
  const tags = useTagFilterOptions();
  const users = useUserFilterOptions();

  const { queryParams, searchParamsObj } = useRouterStuff();

  const filters = useMemo(() => {
    return [
      {
        key: "domain",
        icon: Icons.Globe,
        label: "Domain",
        getOptionIcon: (value) => (
          <BlurImage
            src={`${""}${value}`}
            alt={value}
            className="h-4 w-4 rounded-full"
            width={16}
            height={16}
          />
        ),
        options: domains.map(({ slug, count }) => ({
          value: slug,
          label: slug,
          right: count,
        })),
      },
      {
        key: "tagIds",
        icon: Icons.Tag,
        label: "Tag",
        multiple: true,
        getOptionIcon: (value, props) => {
          const tagColor =
            props.option?.data?.color ??
            tags?.find(({ id }) => id === value)?.color;
          return tagColor ? (
            <TagBadge color={tagColor} withIcon className="sm:p-1" />
          ) : null;
        },
        options:
          tags?.map(({ id, name, color, count }) => ({
            value: id,
            icon: <TagBadge color={color} withIcon className="sm:p-1" />,
            label: name,
            data: { color },
            right: count,
          })) ?? null,
      },
      {
        key: "userId",
        icon: Icons.User,
        label: "Creator",
        options:
          users?.map(({ id, name, email, image, count }) => ({
            value: id,
            label: name || email,
            icon: (
              <Avatar
                user={{
                  id,
                  name,
                  image,
                }}
                className="h-4 w-4"
              />
            ),
            right: count,
          })) ?? null,
      },
    ];
  }, [domains, tags, users]);
  const selectedTagIds = useMemo(
    () => searchParamsObj["tagIds"]?.split(",")?.filter(Boolean) ?? [],
    [searchParamsObj],
  );

  const activeFilters = useMemo(() => {
    const { domain, tagIds, userId } = searchParamsObj;
    return [
      ...(domain ? [{ key: "domain", value: domain }] : []),
      ...(tagIds ? [{ key: "tagIds", value: selectedTagIds }] : []),
      ...(userId ? [{ key: "userId", value: userId }] : []),
    ];
  }, [searchParamsObj, selectedTagIds]);

  const onSelect = (key: string, value: any) => {
    console.log(key, value);
    if (key === "tagIds") {
      queryParams({
        set: {
          tagIds: selectedTagIds.concat(value).join(","),
        },
      });
    } else {
      queryParams({
        set: {
          [key]: value,
        },
      });
    }
  };

  const onRemove = (key: string, value: any) => {
    if (
      key === "tagIds" &&
      !(selectedTagIds.length === 1 && selectedTagIds[0] === value)
    ) {
      queryParams({
        set: {
          tagIds: selectedTagIds.filter((id) => id !== value).join(","),
        },
      });
    } else {
      queryParams({
        del: key,
      });
    }
  };

  const onRemoveAll = () => {
    queryParams({
      del: ["domain", "tagIds", "userId", "search"],
    });
  };

  return { filters, activeFilters, onSelect, onRemove, onRemoveAll };
}

function useDomainFilterOptions() {
  return mockDomains;
}

function useTagFilterOptions() {
  return mockTags;
}

function useUserFilterOptions() {
  return mockUsers;
}
