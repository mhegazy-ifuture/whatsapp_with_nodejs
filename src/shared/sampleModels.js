export function sampletext({ textResponse, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      body: textResponse,
    },
  });
}

export function sampleImage({ imgUrl, caption, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "image",
    image: {
      link: imgUrl,
      caption: caption || "",
    },
  });
}

export function sampleVideo({ videoUrl, caption, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "video",
    video: {
      link: videoUrl,
      caption: caption || "",
    },
  });
}

export function sampleDocument({ documentUrl, caption, filename, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "document",
    document: {
      link: documentUrl,
      caption: caption || "",
      filename: filename || "file",
    },
  });
}

export function sampleMenu({ number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "Feel free to choose your meal with a dessert and a drink",
      },
      body: {
        text: "Select your favorite foods, desserts, and drinks!",
      },
      footer: {
        text: "Thank you for your order!",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "food_options",
              title: "Food Options",
            },
          },
          {
            type: "reply",
            reply: {
              id: "dessert_options",
              title: "Dessert Options",
            },
          },
          {
            type: "reply",
            reply: {
              id: "drink_options",
              title: "Drink Options",
            },
          },
        ],
      },
    },
  });
}

