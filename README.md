# ISA_Narrative_Nexus

# Machine Learning API
## Install instruction
### git clone repository
```
git clone https://github.com/Ic388warlord/ISA_Narrative_Nexus.git
```
### Create a .env file containing OpenAI API key
#### cd into directory containing machine learning api
```
cd ISA_Narrative_Nexus/machine-learning-api/
```
#### create .env file
```
echo "OPENAI_API_KEY=REPLACE WITH YOU API KEY" > .env
```
### Create Python virtual env
#### cd into directory containing machine learning api
```
cd ISA_Narrative_Nexus/machine-learning-api/
```
#### Initiate virtual environment
Creates a virtual python environment called venv

On Windows (Note: check if 'python' on windows is python version 3): 
```
python -m venv venv
```


On Unix or MacOS:
```
python3 -m venv venv
```
#### Activate the virtual environment
On Windows:
```
venv\Scripts\activate
```

On Unix or MacOS:
```
source venv/bin/activate
```
### Install required dependencies
Note: pip3 is used for Python 3 packages
```
pip3 install -r requirements.txt
```
### Initiate app.py
On Windows:
```
python app.py
```

On Unix or MacOS:
```
python3 app.py
```

### Support genres:
```
superhero, action, drama, horror, thriller, sci_fi
```

#### Call the POST request with postman:

#####
```
http://localhost:8000/generate
```

```json
{
    "sentence" : "Batman",
    "genre" : "superhero"
}
```
