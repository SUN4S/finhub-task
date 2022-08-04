import { useParams } from "react-router";

export const Details = () => {
  const { symbol } = useParams();
  console.log(symbol);

  return <div>Details</div>;
};
