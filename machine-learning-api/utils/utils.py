# Contains helper functions for machine-learning-api
import re

def cleanGeneratedMsg(sentence):
    return re.sub(r'<[^>]+>', '', sentence)
