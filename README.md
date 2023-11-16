# ISA_Narrative_Nexus

# Machine Learning API
## Installation instruction
### 1. git clone repository
```
git clone https://github.com/Ic388warlord/ISA_Narrative_Nexus.git
```
### 2. Create a .env file containing OpenAI API key
#### cd into directory containing machine learning api
```
cd ISA_Narrative_Nexus/machine-learning-api/
```
#### create .env file
```
echo "OPENAI_API_KEY=REPLACE WITH YOU API KEY" > .env
```
##### Check if the .env file was created successfully
```
cat .env
```
### 4. Create Python virtual env
#### cd into directory containing machine learning api
```
cd ISA_Narrative_Nexus/machine-learning-api/
```
#### Install virtualenv
On Windows:
```
pip3 install virtualenv
```

On Unix or MacOS
```
apt install python3.11-venv
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
### 5. Install required dependencies
Note: pip3 is used for Python 3 packages
```
pip3 install -r requirements.txt
```
### 6. Initiate app.py
On Windows:
```
python app.py
```

On Unix or MacOS:
```
python3 app.py
```
### 7. Supported genres:
```
superhero, action, drama, horror, thriller, sci_fi
```
#### Call the POST request with postman:
##### URL
```
http://localhost:8000/generate
```
##### Request Body
```json
{
    "sentence" : "Batman",
    "genre" : "superhero"
}
```
