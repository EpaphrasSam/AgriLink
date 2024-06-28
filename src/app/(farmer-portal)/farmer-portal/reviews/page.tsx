"use client";

import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";

const sampleReviews = [
  {
    id: "1",
    user: "John Doe",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 22, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 5,
    replies: [
      {
        id: "1",
        user: "Sarah",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 22, 2023",
        comment:
          "Thank you for your positive feedback, John! We're glad to hear that you enjoy our fresh products and find our staff helpful. We hope to continue providing you with great service!",
      },
    ],
  },
  {
    id: "2",
    user: "Sarah Smith",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 3,
    replies: [],
  },
  {
    id: "3",
    user: "Jeremy",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 4,
    replies: [],
  },
  {
    id: "3",
    user: "Sam",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",

    rating: 2,
    replies: [],
  },
];

export default function ReviewsPage() {
  const handleReply = (reviewId: string, reply: string) => {
    console.log(`Reply to review ${reviewId}: ${reply}`);
    // Implement the reply logic here
  };

  const handleAddReview = (rating: string, comment: string) => {
    console.log(`New review - Rating: ${rating}, Comment: ${comment}`);
    // Implement the add review logic here
  };

  return (
    <div className="p-6">
      <RatingsAndReviews
        reviews={sampleReviews}
        isFarmerPortal={true} // Change to false if not in farmer portal
        isUserLoggedIn={true} // Change to false if user is not logged in
        onReply={handleReply}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
