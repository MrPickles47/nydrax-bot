class NydraxCore:
    def __init__(self):
        with open("core/persona.txt", "r", encoding="utf-8") as f:
            self.persona = f.read()

    def process(self, message: str):
        # Aqui colocamos a IA futuramente.
        # Por enquanto responde um placeholder bonito.
        return (
            "🔧 *Nydrax AI Core Offline*\n"
            "Ainda sem conexão ao módulo OpenAI.\n"
            "Mensagem recebida:\n"
            f"`{message}`"
        )
