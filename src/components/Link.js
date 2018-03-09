import React from "react";

export default function Link({ link: { description, url } }) {
  return (
    <div>
      <div>
        {description} ({url})
      </div>
    </div>
  );
}
