import openai

client = openai.OpenAI(api_key='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')

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  response_format={"type": "json_object"},
  messages=[
    {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
    {"role": "user", "content": "Who won the world series in 2020?"}
  ]
)
print(response.choices[0].message.content)