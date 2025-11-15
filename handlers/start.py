from aiogram import Router
from aiogram.types import Message
from utils.buttons import main_menu
import config

router = Router()

@router.message(commands=["start"])
async def start(msg: Message):
    await msg.answer(
        f"🔥 Olá, {msg.from_user.first_name}!\n"
        "Eu sou o *Nydrax AI Bot*.\n\n"
        "Escolha uma opção abaixo:",
        reply_markup=main_menu()
    )
