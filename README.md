# Storyboard Tool

This repository contains a minimal Flask application for creating a storyboard for a reality TV show. Characters, locations, and episodes can be managed via a simple web interface. Scenes are associated with episodes and reference characters and locations.

## Setup

Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Running

```bash
python -m codex_storyboard.app
```

Then open <http://localhost:5000> in your browser.

## Testing

```bash
pytest
```
