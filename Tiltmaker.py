from groq import Groq

client = Groq(api_key="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",)
def TitMaker(content):
    completion = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {
                "role": "system",
                "content": "your job is to sumerise long texts in less than 5 words you cannot say anything more than 5 word, rules : give the answer directlly"
            },
            {
                "role": "user",
                "content": ""
            },
            {"role": "user", "content":content}
        ],
        temperature=1,
        max_tokens=17930,
        top_p=1,
        stream=False,
        stop=None,
    )

    return completion.choices[0].message.content