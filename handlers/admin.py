import config
from aiogram import Router
from aiogram.types import Message

router = Router()

@router.message(commands=["dev"])
async def dev_panel(msg: Message):
    if str(msg.from_user.id) not in config.ADMINS:
        return await msg.answer("⛔ Acesso negado.")
    
    await msg.answer(
        "🛠️ *Painel do Desenvolvedor*\n"
        "• Logs\n"
        "• Reiniciar Container\n"
        "• Status do Core"
    )
