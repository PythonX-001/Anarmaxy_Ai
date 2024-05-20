from groq import Groq

client = Groq()
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
        {
            "role": "user",
            "content": "\"\nThis Flask application appears to be a chatbot system with user authentication. Let's break down its functionality:\n\nUser Authentication:\n\nUsers can register with a username, email, and password.\nExisting users can log in with their credentials.\nSession management is used to keep track of logged-in users.\nChat Interface:\n\nOnce logged in, users are directed to a chat interface.\nUsers can input messages, which are then sent to the server.\nThe server interacts with an external API (get_bot_response function) to fetch responses from a chatbot service.\nThe chat history is displayed on the screen, showing both user messages and responses from the chatbot.\nHTML Templates:\n\nThe HTML templates (index.html, login.html, register.html, chat.html) are used to render different pages and elements of the web application.\nThey utilize Jinja2 templating to dynamically generate content based on server-side data.\nStatic Assets:\n\nThe application serves static assets such as CSS files (output.css, style/style.css) and JavaScript files (js/index.js, js/chat.js, js/defaultScreen.js, js/nav.js).\nSession Management:\n\nSession data is used to keep track of the logged-in user's username.\nData Storage:\n\nUser data is stored in a JSON file (users.json).\nChat history for each user is stored in separate JSON files within a directory (chat_history).\nExternal Dependencies:\n\nThe application depends on several external libraries and services, including Flask, Beautiful Soup (for HTML parsing), and requests (for making HTTP requests).\nNow, what would you like to do next with this code?\n\"\n\n\n\n\n"
        }
    ],
    temperature=1,
    max_tokens=17930,
    top_p=1,
    stream=False,
    stop=None,
)

print(completion.choices[0].message)
