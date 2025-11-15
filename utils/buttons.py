from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

def main_menu():
    kb = [
        [InlineKeyboardButton("💬 Falar com Nydrax", callback_data="talk")],
        [InlineKeyboardButton("⚙️ Configurações", callback_data="config")],
        [InlineKeyboardButton("🚀 Projetos", callback_data="projects")],
        [InlineKeyboardButton("👨‍💻 Suporte", callback_data="support")],
    ]
    return InlineKeyboardMarkup(inline_keyboard=kb)
