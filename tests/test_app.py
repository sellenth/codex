import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from codex_storyboard.app import app


def test_index():
    client = app.test_client()
    resp = client.get('/')
    assert resp.status_code == 302
    assert '/episodes' in resp.location


def test_characters_page():
    client = app.test_client()
    resp = client.get('/characters')
    assert resp.status_code == 200
