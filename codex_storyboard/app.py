from flask import Flask, render_template, request, redirect, url_for
from .storage import (
    load_characters,
    save_characters,
    load_locations,
    save_locations,
    load_episodes,
    save_episodes,
)
from .models import Character, Location, Episode, Scene

app = Flask(__name__)


@app.route("/")
def index():
    return redirect(url_for("episodes"))


@app.route("/characters", methods=["GET", "POST"])
def characters():
    characters = load_characters()
    if request.method == "POST":
        new_id = max([c.id for c in characters], default=0) + 1
        characters.append(
            Character(
                id=new_id,
                name=request.form["name"],
                age=int(request.form["age"]),
                occupation=request.form["occupation"],
                bio=request.form["bio"],
            )
        )
        save_characters(characters)
        return redirect(url_for("characters"))
    return render_template("characters.html", characters=characters)


@app.route("/locations", methods=["GET", "POST"])
def locations():
    locations = load_locations()
    if request.method == "POST":
        new_id = max([l.id for l in locations], default=0) + 1
        locations.append(Location(id=new_id, name=request.form["name"]))
        save_locations(locations)
        return redirect(url_for("locations"))
    return render_template("locations.html", locations=locations)


@app.route("/episodes")
def episodes():
    episodes = load_episodes()
    return render_template("episodes.html", episodes=episodes)


@app.route("/episodes/<int:ep_id>")
def episode_detail(ep_id: int):
    episodes = load_episodes()
    episode = next((e for e in episodes if e.id == ep_id), None)
    characters = load_characters()
    locations = load_locations()
    if episode is None:
        return "Episode not found", 404
    return render_template(
        "episode_detail.html",
        episode=episode,
        characters=characters,
        locations=locations,
    )


@app.route("/episodes/<int:ep_id>/add_scene", methods=["POST"])
def add_scene(ep_id: int):
    episodes = load_episodes()
    episode = next((e for e in episodes if e.id == ep_id), None)
    if episode is None:
        return "Episode not found", 404
    new_id = max([s.id for s in episode.scenes], default=0) + 1
    char_ids = [int(cid) for cid in request.form.getlist("characters")]
    scene = Scene(
        id=new_id,
        location_id=int(request.form["location"]),
        character_ids=char_ids,
        description=request.form.get("description", ""),
    )
    episode.scenes.append(scene)
    save_episodes(episodes)
    return redirect(url_for("episode_detail", ep_id=ep_id))


@app.route("/storyboard")
def storyboard():
    characters = load_characters()
    locations = load_locations()
    return render_template("storyboard.html", characters=characters, locations=locations)


if __name__ == "__main__":
    app.run(debug=True)
