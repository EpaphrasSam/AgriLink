import { Button, Avatar, AvatarGroup, Card } from "@nextui-org/react";
import { IoIosCreate } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const forums = [
  {
    id: 1,
    title: "General Discussion",
    author: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    },
    summary: "This is a general discussion forum.",
    replies: 10,
    participants: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    ],
  },
  {
    id: 2,
    title: "Tech Talk",
    author: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    },
    summary: "Discuss the latest in tech.",
    replies: 25,
    participants: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    ],
  },
  // Add more forum objects as needed
];

export default function Forum() {
  return (
    <div className="p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-end mb-4">
          <Button
            variant="ghost"
            radius="sm"
            color="primary"
            startContent={<IoIosCreate size={20} />}
          >
            Create Post
          </Button>
        </div>
        {forums.map((forum) => (
          <Link href={`/forum/${forum.id}`} key={forum.id}>
            <Card isPressable fullWidth className="mb-6 p-4">
              <div className="flex items-center mb-2">
                <Avatar src={forum.author.avatar} />
                <div className="ml-3">
                  <h2 className="text-lg font-semibold">{forum.title}</h2>
                  <p className="text-sm text-gray-500">
                    Started by {forum.author.name}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{forum.summary}</p>
              <div className="flex items-center w-full justify-between">
                <p className="text-sm text-gray-500">{forum.replies} replies</p>
                <AvatarGroup>
                  {forum.participants.map((avatar, index) => (
                    <Avatar key={index} src={avatar} size="sm" />
                  ))}
                </AvatarGroup>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
