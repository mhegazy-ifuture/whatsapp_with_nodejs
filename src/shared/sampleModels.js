/**
 * Returns a sample text message
 * @param {String} textResponse text to be sent
 * @param {String} number the number to be sent to
 * @returns {String} a json string of the message
 */
function sampletext(textResponse, number) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      body: textResponse,
    },
  });
}

/**
 * Returns a sample image message
 * @param {String} imgUrl the url of the image
 * @param {String} [caption] the caption of the image
 * @param {String} number the number to be sent to
 * @returns {String} a json string of the message
 */
function sampleImage({ imgUrl, caption, number }) {
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

function sampleVideo({ videoUrl, caption, number }) {
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

function sampleDocument({ documentUrl, caption, filename, number }) {
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

function sampleMenuFlow({ number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
        type: "flow",
        header: {
            type: "text",
            text: {
                body :"welcome in our menu",
            }
        },
      body: {
        text: "feel free to choose your meal with a desert and a drink",
        },
      footer: {
        text: "thank you for your order",
      } ,
      action: {
        name: "flow",
        parameters: {
          flow_message_version: "3",
          flow_token: "AQAAAAACS5FpgQ_cAAAAAD0QI3s.",
          flow_id: "1",
          flow_cta: "Request!",
          flow_action: "navigate",
          flow_action_payload: [
            {
              screen: "foods",
              data: [
                {
                  product_name: "pizza",
                  product_description: "description",
                  product_price: 100,
                },
                {
                  product_name: "Burger",
                  product_description:
                    "Juicy grilled beef patty, fresh lettuce, tomatoes, onions, and signature sauce on a toasted bun.",
                  product_price: 80,
                },
                {
                  product_name: "Sushi",
                  product_description:
                    "Freshly prepared sushi rolls with a variety of fillings, served with soy sauce and wasabi.",
                  product_price: 150,
                },
                {
                  product_name: "Pasta",
                  product_description:
                    "Al dente spaghetti served with a rich marinara sauce and topped with grated Parmesan.",
                  product_price: 90,
                },
                {
                  product_name: "Salad",
                  product_description:
                    "A refreshing mix of seasonal vegetables, topped with a tangy vinaigrette.",
                  product_price: 70,
                },
              ],
            },
            {
              screen: "desserts",
              data: [
                {
                  product_name: "Chocolate Cake",
                  product_description:
                    "Rich chocolate cake layered with creamy frosting.",
                  product_price: 80,
                },
                {
                  product_name: "Ice Cream",
                  product_description:
                    "Creamy vanilla ice cream served with your choice of toppings.",
                  product_price: 60,
                },
                {
                  product_name: "Cheesecake",
                  product_description:
                    "Classic cheesecake with a crumbly crust and smooth filling.",
                  product_price: 90,
                },
                {
                  product_name: "Brownie",
                  product_description:
                    "Fudgy brownie served warm with a scoop of ice cream.",
                  product_price: 70,
                },
                {
                  product_name: "Fruit Tart",
                  product_description:
                    "A delicious tart filled with creamy custard and topped with fresh fruits.",
                  product_price: 85,
                },
              ],
            },
            {
              screen: "drinks",
              data: [
                {
                  product_name: "Lemonade",
                  product_description:
                    "Freshly squeezed lemonade with a hint of mint, served chilled.",
                  product_price: 50,
                },
                {
                  product_name: "Iced Coffee",
                  product_description:
                    "Rich and refreshing iced coffee, perfect for a hot day.",
                  product_price: 60,
                },
                {
                  product_name: "Smoothie",
                  product_description:
                    "A blend of fruits with yogurt, perfect for a nutritious snack.",
                  product_price: 70,
                },
                {
                  product_name: "Soda",
                  product_description:
                    "Classic carbonated soft drink, available in various flavors.",
                  product_price: 40,
                },
                {
                  product_name: "Tea",
                  product_description:
                    "A selection of herbal, black, and green teas to soothe your senses.",
                  product_price: 30,
                },
              ],
            },
          ],
        },
      },
    },
  });
}
