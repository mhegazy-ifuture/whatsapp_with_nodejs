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

export function sampleMultiSelectMenu({ number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Choose your options",
      },
      body: {
        text: "Select multiple items from the list below:",
      },
      footer: {
        text: "You can select more than one option.",
      },
      action: {
        button: "Select Options",
        sections: [
          {
            title: "Food",
            rows: [
              { id: "food1", title: "Pizza" },
              { id: "food2", title: "Burger" },
              { id: "food3", title: "Pasta" },
            ],
          },
          {
            title: "Desserts",
            rows: [
              { id: "dessert1", title: "Ice Cream" },
              { id: "dessert2", title: "Cake" },
              { id: "dessert3", title: "Cookies" },
            ],
          },
          {
            title: "Drinks",
            rows: [
              { id: "drink1", title: "Soda" },
              { id: "drink2", title: "Juice" },
              { id: "drink3", title: "Water" },
            ],
          },
        ],
      },
    },
  });
}

