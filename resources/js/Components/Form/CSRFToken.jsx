import React from "react";

function CSRFToken() {
    const token = document.head
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    return <input type="hidden" value={token} name="_token" />;
}

export default CSRFToken;
