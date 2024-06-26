from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import requests
import os
from bs4 import BeautifulSoup
import re
import uuid
from groq import Groq

client = Groq(api_key="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",)

app = Flask(__name__)
app.secret_key = 'your_secret_key'




def load_user_data():
    try:
        with open('users.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

# Function to save user data to JSON file
def save_user_data(data):
    with open('users.json', 'w') as f:
        json.dump(data, f, indent=2)

# Function to load chat history from JSON file
def load_chat_history(username, chat_history_id):

    file_path = os.path.join('chat_history', f'{username}_{chat_history_id}.json')
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return [{"role": "system", "content": "you are a helpfull assistant ,your name is Anarmaxy, you are created by two young devolopers No0ne and Don you can call 'them the Exe team' , they build you to solve and help people , answer like a freind and dont talk in formular way . you are a project that have a goal is give the people a free and secure ai chat website without taking any of user data and let the user be free in using the site. you should allways put code inside <pre><code></pre></code> instead of (````)."}]

# Function to save chat history to JSON file
def save_chat_history(username, chat_history_id, chat_history):
    file_path = os.path.join('chat_history', f'{username}_{chat_history_id}.json')
    with open(file_path, 'w') as f:
        json.dump(chat_history, f, indent=2)

# Function to load chat history names for a user
def load_chat_history_names(username):
    user_data = load_user_data()
    if username in user_data and 'chat_histories' in user_data[username]:
        # Return a list of dictionaries with 'id' and 'title' keys
        return [{'id': chat['id'], 'title': chat['title']} for chat in user_data[username]['chat_histories']]
    return []

# Function to create a new chat history
def create_new_chat_history(username):
    os.makedirs('chat_history', exist_ok=True)

    chat_history_id = str(uuid.uuid4())
    new_chat_history = [
        {
            "role": "system",
            "content": "you are a helpfull assistant ,your name is Anarmaxy, you are created by two young devolopers No0ne and Don you can call 'them the Exe team' , they build you to solve and help people , answer like a freind and dont talk in formular way . you are a project that have a goal is give the people a free and secure ai chat website without taking any of user data and let the user be free in using the site. you should allways put code inside <pre><code></pre></code> instead of (````)."
        }
    ]
    save_chat_history(username, chat_history_id, new_chat_history)

    # Initialize an empty chat title
    chat_title = ""

    user_data = load_user_data()
    if username not in user_data:
        user_data[username] = {'chat_histories': [{'id': chat_history_id, 'title': chat_title}]}
    else:
        user_data[username]['chat_histories'].append({'id': chat_history_id, 'title': chat_title})
    save_user_data(user_data)
    return chat_history_id


# API endpoint for chatbot
def get_bot_response(user_input):
    chat_completion = client.chat.completions.create(
    model="gemma-7b-it",
    messages=user_input,
    temperature=1,
    max_tokens=8192,
    top_p=1,
    stream=False,
    stop=None,
    )
    content = chat_completion.choices[0].message.content
    return content
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
        max_tokens=8192,
        top_p=1,
        stream=False,
        stop=None,
    )

    return completion.choices[0].message.content


#Converting js to html

def create_chat_li(message, type):
    soup = BeautifulSoup('', 'html.parser')

    chat_li = soup.new_tag('div', attrs={'class': f'chat {type} group'})

    if type == "outgoing":
        chat_li.append(soup.new_tag('div', attrs={'class': 'whitespace-pre-wrap h-fit break-words max-w-[80%] text-base border-[1px] border-solid border-border px-[16px] py-[12px] text-text'}))
        chat_li.append(soup.new_tag('span', attrs={'class': 'icon icon icon size-7 self-start bg-gr leading-8 rounded-main bg-cover'}))
    elif type == "incoming":
        flex_div = soup.new_tag('div', attrs={'class': 'flex items-start gap-4'})
        flex_div.append(soup.new_tag('span', attrs={'class': 'icon size-7 self-start border-2 border-solid border-border leading-8'}))
        flex_div.append(soup.new_tag('div', id='response', attrs={'class': 'h-fit w-fit max-w-[90%] whitespace-pre-wrap break-words text-base text-text'}))
        
        action_div = soup.new_tag('div', attrs={'class': 'action mt-1 flex justify-start gap-3 empty:hidden ml-[2.8rem]'})
        button_div = soup.new_tag('div', attrs={'class': 'group-hover:visible invisible -ml-1 mt-0 flex justify-center self-end text-gray-400 lg:justify-start lg:self-center'})
        button_div.append(soup.new_tag('button', id='copyButton', attrs={'class': 'cursor-pointer text-background-700 transition-all hover:text-background-500', 'data-state': ''}))
        button_div.find('button').append(soup.new_tag('i', attrs={'class': 'clipboard-icon fa-regular fa-clipboard'}))
        button_div.find('button').append(soup.new_tag('span', attrs={'class': 'sr-only'}))

        action_div.append(button_div)

        chat_li.append(flex_div)
        chat_li.append(action_div)

    chat_li.find(class_='h-fit').string = message
    return str(chat_li)

def create_chat_element(tag, classes):
    element = BeautifulSoup('', 'html.parser').new_tag(tag)
    element['class'] = classes
    return element

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('chat'))
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_email = request.form.get('username_email')
        password = request.form.get('password')

        user_data = load_user_data()

        if username_email in user_data and user_data[username_email]['password'] == password:
            session['username'] = username_email
            return redirect(url_for('chat'))
        else:
            return render_template('login.html', error='Invalid credentials')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        user_data = load_user_data()

        if username in user_data or email in [user['email'] for user in user_data.values()]:
            return render_template('register.html', error='Username or email already in use')

        if not re.match(r'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$', password):
            return render_template('register.html', error='Password must be 6-16 characters, include a digit, and a special character.')

        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            return render_template('register.html', error='Enter a valid email address.')

        user_data[username] = {'email': email, 'password': password, 'chat_histories': []}
        save_user_data(user_data)

        session['username'] = username
        return redirect(url_for('login'))

    return render_template('register.html')


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if 'username' not in session:
        return redirect(url_for('home'))

    username = session['username']
    chat_history_id = request.args.get('id')
    if chat_history_id is None:
        chat_history_id = request.form.get('chat_history_id')

    chat_history = load_chat_history(username, chat_history_id)

    if chat_history_id is None:
        # Create a new chat history and return the chat_history_id
        chat_history_id = create_new_chat_history(username)
        return redirect(url_for('chat', id=chat_history_id))

    if request.method == 'POST':
        user_input = request.form.get('user_input')

        # Save user input in chat history
        chat_history.append({'role': 'user', 'content': user_input})
        save_chat_history(username, chat_history_id, chat_history)

        # Get bot response using the chatbot API
        bot_response = get_bot_response(chat_history)

        # Save bot response in chat history
        chat_history.append({'role': 'assistant', 'content': bot_response})
        save_chat_history(username, chat_history_id, chat_history)

        # Check if the chat history already has a title
        user_data = load_user_data()
        chat_title = next((chat['title'] for chat in user_data[username]['chat_histories'] if chat['id'] == chat_history_id), None)

        if not chat_title:
            # Generate a chat title using TitMaker after the bot's response
            chat_title = TitMaker(bot_response)

            # Update the chat title in the user's data
            for chat in user_data[username]['chat_histories']:
                if chat['id'] == chat_history_id:
                    chat['title'] = chat_title
                    break
            save_user_data(user_data)
            

        return jsonify({'status': 'success', 'bot_response': bot_response})


    processed_chat = []
    for message in chat_history:
        if message['role'] == 'user':
            chat_li = create_chat_li(message['content'], 'outgoing')
        elif message['role'] == 'assistant':
            chat_li = create_chat_li(message['content'], 'incoming')
        else:
            # Handle other roles if needed
            #chat_li = create_chat_element("div", [message['role']])
            #chat_li.string = message['content']
            chat_li = ""

        processed_chat.append(chat_li)

    return render_template('chat.html', chat_history=processed_chat)

    
@app.route('/create_chat', methods=['POST'])
def create_chat():
    if 'username' not in session:
        return redirect(url_for('home'))

    username = session['username']
    chat_history_id = create_new_chat_history(username)
    return jsonify({'chat_history_id': chat_history_id})

@app.route('/chat_history_names', methods=['GET'])
def get_chat_history_names():
    if 'username' not in session:
        return jsonify([])

    username = session['username']
    chat_history_names = load_chat_history_names(username)
    return jsonify(chat_history_names)

@app.route('/get_chat_history_list', methods=['GET'])
def get_chat_history_list():
    username = session['username']
    user_data = load_user_data()
    chat_history_list = user_data.get(username, {}).get('chat_histories', [])
    return jsonify(chat_history_list)

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)