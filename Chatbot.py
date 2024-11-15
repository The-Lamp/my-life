import random

def load_data(file_path):
    """Reads data from a text file and returns it as a list of sentences."""
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.readlines()
    return [line.strip() for line in data if line.strip()]

def generate_response(user_input, data):
    """Generates a basic response based on user input and the data from the file."""
    # Matching user input with data (basic keyword matching for simplicity)
    for line in data:
        if any(word in line.lower() for word in user_input.lower().split()):
            return line

    # If no match is found, return a random response
    return random.choice(data)

def chatbot(file_path):
    """Main function to run the chatbot."""
    data = load_data(file_path)
    print("AI Chatbot: Namaste! Aap mujhse kuch bhi pooch sakte hain.")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("AI Chatbot: Alvida! Phir milenge.")
            break
        response = generate_response(user_input, data)
        print(f"AI Chatbot: {response}")

if __name__ == "__main__":
    # Replace 'data.txt' with the path to your text file
    chatbot('data.txt')
