from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

def get_response(user_msg):
    msg = user_msg.lower()

    # Basic greetings
    if any(w in msg for w in ["hello", "hi", "hey"]):
        return "Hello!! 😎"

    if "how are you" in msg:
        return "I'm operating at 100% efficiency 💯"

    if "your name" in msg:
        return "I'm your personal chatbot assistant."

    if "who made you" in msg or "creator" in msg:
        return "Dinesh created me 🦇🔥"

    # Time/date
    if "time" in msg:
        return "Time now: " + datetime.now().strftime("%H:%M:%S")

    if "date" in msg:
        return "Today: " + datetime.now().strftime("%Y-%m-%d")

    # Joke
    if "joke" in msg:
        return "Why do programmers hate holidays? Too many 'break' statements 😂"

    # Weather stub
    if "weather" in msg:
        return "I cannot fetch weather yet, but I can search it!"

    # Search redirect
    complex_keys = ["explain", "what is", "why", "how", "define", "meaning"]
    if any(w in msg for w in complex_keys):
        query = user_msg.replace(" ", "+")
        url = f"https://www.google.com/search?q={query}"
        return f"That looks complex 🤔\nLet me help you search:\n{url}"

    return "I’m not sure about that. Try asking differently!"
    

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chatbot_response():
    data = request.get_json()
    user_msg = data.get("msg")
    bot_reply = get_response(user_msg)
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)