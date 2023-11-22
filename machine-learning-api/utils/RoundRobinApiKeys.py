class RoundRobinAPIKeys:
    def __init__(self, api_keys) -> None:
        self.api_keys = api_keys
        self.current_index = 0
    
    def get_next_key(self) -> str:
        key = self.api_keys[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.api_keys)
        print(f"Using Key: {key}")
        return key