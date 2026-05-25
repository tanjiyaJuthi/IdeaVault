"use client";

import { useState } from "react";
import MyInteractions from "./MyInteractions";

const MyInteractionsClient = ({ comments: initialComments, user, token }) => {
  const [comments, setComments] = useState(initialComments);

  return <MyInteractions
    comments={comments}
    user={user}
    token={token}
  />;
};

export default MyInteractionsClient;