import { useEffect, useState } from "react";

import AnimationLayout from "../App/AnimationLayout";
import LoaderLayout from "./LoaderLayout";

interface Props {
  isFetching: boolean;
  children: React.ReactElement;
}

export default function LoaderSuspense({ isFetching, children }: Props) {
  const [minimumLoadingTimeExpired, setMinimumLoadingTimeExpired] = useState(false);
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);

  useEffect(() => {
    if (isFetching) {
      setTimeout(() => {
        setMinimumLoadingTimeExpired(true);
      }, 1000);

      setTimeout(() => {
        setTimeoutExceeded(true);
      }, 10000);
    }
  }, [isFetching]);

  if (timeoutExceeded && isFetching) {
    throw Error("Connection timeout");
  }

  if (!minimumLoadingTimeExpired && isFetching) {
    return <div />;
  }

  if (minimumLoadingTimeExpired && isFetching) {
    return (
      <AnimationLayout>
        <LoaderLayout />
      </AnimationLayout>
    );
  }

  // This is to avoid false positive in dev mode (with HMR)
  if (!isFetching && (minimumLoadingTimeExpired || timeoutExceeded)) {
    setMinimumLoadingTimeExpired(false);
    setTimeoutExceeded(false);
  }

  return children;
}
