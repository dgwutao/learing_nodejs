import OpenAI from "openai";

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});

// const stream = await client.responses.create({
//     model: "gpt-5",
//     input: [
//         {
//             role: "user",
//             content: "写一个关于独角兽的睡前故事",
//         },
//     ],
//     tools: [
//         { type: "web_search" },
//     ],
//     stream: true,
// });

// for await (const event of stream) {
//     console.log(event);
// }

const response = await client.responses.create({
    model: "gpt-5-nano",
    tools: [
        { type: "web_search" },
    ],
    input: "写一个关于独角兽的睡前故事"
});

console.log(response);