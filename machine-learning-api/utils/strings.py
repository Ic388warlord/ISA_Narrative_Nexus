# Contains all strings pertaining to machine-learning-api
GPT_MODEL = 'gpt-3.5-turbo'
CONTENT_TYPE = 'Content-Type'
CONTENT_TYPE_JSON = 'application/json'
POST = 'POST'
KEY_SENTENCE = 'sentence'
KEY_GENRE = 'genre'
KEY_ERROR = 'error'
KEY_GENERATED_TEXT = 'generated_text'
MSG_INVALID_PAYLOAD = "Invalid JSON payload. 'sentence' and 'genre' are required."
MSG_INVALID_METHOD_CONTENT = "Invalid request method or content type."
ENDPOINT = '/api/v1'
ROUTE_GENERATE_STORY = '/generateStory'


def systemContentScenario(paragraph):
    return f'''Generate three potential one-sentence scenarios with the following structure:
    {{"scenario1": "", "scenario2": "", "scenario3": ""}}.
    
    Paragraph:
    "{paragraph}"
    '''

def systemContentParagraph():
    return f"Fix the grammar and punctuation in the following text: "

def gptCompletionMsg(paragraph, system_content):
    return [
            {"role": "system", "content" :system_content},
            {"role": "user", "content": paragraph}
        ]

def storyGenArg(genre, sentence):
    return f"<BOS> <{genre}> {sentence}"
