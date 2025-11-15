from aiogram import Router
from aiogram.types import Message

router = Router()

@router.message(commands=["help"])
async def help_cmd(msg: Message):
    await msg.answer(
        "📘 *Comandos disponíveis:*\n"
        "/start — Iniciar bot\n"
        "/help — Ajuda\n"
        "/status — Status do Sistema\n"
        "/dev — Painel do Desenvolvedor"
    )
