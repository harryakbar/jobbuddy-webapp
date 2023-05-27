// nextjs-api.js
import { Configuration, OpenAIApi } from "openai";
import { API_KEY } from "./constant";

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(input) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "You are a resume maker, please improve the following experience description to make it more sophisticated \n- I researched to reduce the risk of car embezzlement for self-drive car rental services in Indonesia \n- I completed market research to know the car rental business potential in South-East Asia \n- I improved the car rental cross-selling capability",
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Handle the API response
    console.log(response);

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error:", error);
  }
}
