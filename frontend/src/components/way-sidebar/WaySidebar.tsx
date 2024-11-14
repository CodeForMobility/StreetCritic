import { useEffect, useState } from "react";
import WayInfo from "@/components/way-info";
import Loader from "@/components/loader";
import config from "@/config";

type Props = {
  wayId: number;
};

export default function WaySidebar({ wayId }: Props) {
  const [loading, setLoading] = useState(false);
  const [wayData, setWayData] = useState(null);
  const [ratingsData, setRatingsData] = useState(null);

  useEffect(() => {
    (async () => {
      setWayData(null);
      setRatingsData(null);
      setLoading(true);
      const wayResponse = await fetch(`${config.apiURL}/ways/${wayId}`);
      const way = await wayResponse.json();
      setWayData(way);

      // TODO use cache
      const ratingsResponse = await fetch(
        `${config.apiURL}/ratings?way_id=${wayId}`,
        { cache: "no-store" },
      );
      const ratings = await ratingsResponse.json();
      setRatingsData(ratings);
      console.log(wayId, ratings, `${config.apiURL}/ratings?way_id=${wayId}`);
      setLoading(false);
    })();
  }, [wayId]);

  if (loading) {
    return <Loader />;
  }

  if (!wayData || !ratingsData) {
    return <p>empty</p>;
  }

  return <WayInfo way={wayData} ratings={ratingsData} />;
}
