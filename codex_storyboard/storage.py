import json
from pathlib import Path
from typing import List
from .models import Character, Location, Episode, Scene

DATA_DIR = Path(__file__).resolve().parent / "../data"

CHARACTERS_FILE = DATA_DIR / "characters.json"
LOCATIONS_FILE = DATA_DIR / "locations.json"
EPISODES_FILE = DATA_DIR / "episodes.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)


def _load(file: Path):
    if file.exists():
        with file.open() as f:
            return json.load(f)
    return []


def _save(file: Path, data):
    with file.open("w") as f:
        json.dump(data, f, indent=2)


def load_characters() -> List[Character]:
    return [Character(**c) for c in _load(CHARACTERS_FILE)]


def save_characters(chars: List[Character]):
    _save(CHARACTERS_FILE, [c.__dict__ for c in chars])


def load_locations() -> List[Location]:
    return [Location(**l) for l in _load(LOCATIONS_FILE)]


def save_locations(locs: List[Location]):
    _save(LOCATIONS_FILE, [l.__dict__ for l in locs])


def load_episodes() -> List[Episode]:
    data = _load(EPISODES_FILE)
    episodes = []
    for e in data:
        scenes = [Scene(**s) for s in e.get("scenes", [])]
        episodes.append(Episode(id=e["id"], title=e["title"], scenes=scenes))
    return episodes


def save_episodes(episodes: List[Episode]):
    data = []
    for e in episodes:
        scenes = [s.__dict__ for s in e.scenes]
        data.append({"id": e.id, "title": e.title, "scenes": scenes})
    _save(EPISODES_FILE, data)
