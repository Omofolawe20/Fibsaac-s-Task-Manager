from flask import Flask, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def init_db():
    connection = sqlite3.connect("tasks.db")

    connection.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )
    """)

    connection.commit()
    connection.close()


init_db()


@app.route("/")
def home():
    return {"message": "Fibsaac's Task Manager API is running!"}


@app.route("/tasks", methods=["GET"])
def get_tasks():
    connection = sqlite3.connect("tasks.db")
    connection.row_factory = sqlite3.Row

    tasks = connection.execute(
        "SELECT * FROM tasks"
    ).fetchall()

    connection.close()

    return {"tasks": [dict(task) for task in tasks]}


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    connection = sqlite3.connect("tasks.db")

    cursor = connection.execute(
        "INSERT INTO tasks (text) VALUES (?)",
        (data["text"],)
    )

    connection.commit()

    new_task_id = cursor.lastrowid

    connection.close()

    return {
        "id": new_task_id,
        "text": data["text"],
        "completed": False
    }, 201
   
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    connection = sqlite3.connect("tasks.db")

    connection.execute(
        "DELETE FROM tasks WHERE id = ?",
        (task_id,)
    )

    connection.commit()
    connection.close()

    return {"message": "Task deleted successfully"}

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    connection = sqlite3.connect("tasks.db")
    connection.row_factory = sqlite3.Row

    if "text" in data:
        connection.execute("UPDATE tasks SET text = ? WHERE id = ?", (data["text"], task_id))
    if "completed" in data:
        connection.execute("UPDATE tasks SET completed = ? WHERE id = ?", (int(data["completed"]), task_id))

    connection.commit()
    task = connection.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    connection.close()

    if task is None:
        return {"error": "Task not found"}, 404
    return dict(task)

if __name__ == "__main__":
    app.run(debug=True)