from dataclasses import dataclass, field
from typing import List

@dataclass
class Character:
    id: int
    name: str
    age: int
    occupation: str
    bio: str
    image: str = ""  # path to image

@dataclass
class Location:
    id: int
    name: str
    image: str = ""

@dataclass
class Scene:
    id: int
    location_id: int
    character_ids: List[int] = field(default_factory=list)
    description: str = ""

@dataclass
class Episode:
    id: int
    title: str
    scenes: List[Scene] = field(default_factory=list)
