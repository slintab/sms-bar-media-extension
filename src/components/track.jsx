import React, { useEffect, useRef } from "react";

export default function Track({ track }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (track.kind === "video") {
      el.muted = true;
    } else {
      el.muted = false;
    }

    track.attach(el);

    return () => {
      track.detach(el);
    };
  }, [track]);

  return <track.kind ref={ref} />;
}
