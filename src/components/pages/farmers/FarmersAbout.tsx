"use client";

import { Divider } from "@nextui-org/react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";

interface AboutProp {
  about: string;
}

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

const FarmersAbout = ({ about }: AboutProp) => {
  const handleReply = () => {};
  const handleAddReview = () => {};
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">About Our Farm</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Acqua Farm, where we are dedicated to providing the
          freshest and highest quality produce to our community. Our farm is
          located in the heart of Accra, Greater Accra, and has been serving the
          local area for over a decade. We take pride in our sustainable farming
          practices and our commitment to the environment. At Acqua Farm, we
          grow a wide variety of fruits and vegetables, ensuring that our
          customers have access to a diverse selection of fresh produce
          year-round. Our team of experienced farmers works tirelessly to
          cultivate crops that are not only delicious but also nutritious. We
          believe that healthy soil leads to healthy plants, which is why we use
          organic farming methods and avoid the use of harmful pesticides and
          chemicals. In addition to our commitment to quality produce, we also
          prioritize the well-being of our animals. Our livestock is raised in
          humane conditions, with plenty of space to roam and access to fresh,
          clean water. We believe that happy animals produce better products,
          and we strive to ensure that our animals are treated with the utmost
          care and respect. Our farm is more than just a place to buy fresh
          produce; it is a community hub where people can come together to learn
          about sustainable farming, participate in farm tours, and enjoy
          seasonal events. We offer educational programs for children and adults
          alike, teaching the importance of sustainable agriculture and healthy
          eating habits. We are grateful for the support of our community and
          are committed to giving back in any way we can. Whether it&apos;s
          through donations to local food banks or hosting community events, we
          believe in the power of community and the importance of supporting one
          another. Thank you for choosing Acqua Farm. We look forward to
          continuing to serve you with the freshest and highest quality produce
          available. Together, we can make a positive impact on our health, our
          community, and our environment.
        </p>
      </div>

      <Divider className="my-6" />

      <RatingsAndReviews
        reviews={sampleReviews}
        isFarmerPortal={false}
        isUserLoggedIn={true}
        onReply={handleReply}
        onAddReview={handleAddReview}
      />
    </div>
  );
};

export default FarmersAbout;
