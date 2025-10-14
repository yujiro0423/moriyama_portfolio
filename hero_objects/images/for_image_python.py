import sys
import os


class musical_instrument_object:
    def __init__(self, name, type, size, color, is_electric, volume):
        self.name = name
        self.type = type
        self.size = size
        self.color = color
        self.is_electric = is_electric
        self.volume = volume
    
    def play(self):
        print(f"{self.name} is playing with {self.volume} volume")



def sample():
