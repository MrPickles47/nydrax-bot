from aiogram import Router
from aiogram.types import Message
from core.nydrax_core import NydraxCore

router = Router()
core = NydraxCore()

@router.message()
async def fallback(msg: Message):
    response = core.process(msg.text)
    await msg.answer(response, parse_mode="Markdown")
