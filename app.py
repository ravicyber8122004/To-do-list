from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory task list
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = {
        'title': data.get('title'),
        'category': data.get('category'),
        'timestamp': data.get('timestamp')
    }
    tasks.append(task)
    return jsonify({'status': 'Task added successfully'}), 201

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    if 0 <= index < len(tasks):
        deleted = tasks.pop(index)
        return jsonify({'status': 'Task deleted', 'task': deleted})
    return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
