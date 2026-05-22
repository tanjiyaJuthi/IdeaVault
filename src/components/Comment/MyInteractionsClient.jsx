"use client";

import { useState } from "react";
import MyInteractions from "./MyInteractions";

const MyInteractionsClient = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  return <MyInteractions comments={comments} />;
};

export default MyInteractionsClient;