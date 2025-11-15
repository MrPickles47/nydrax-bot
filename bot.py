import asyncio
from aiogram import Bot, Dispatcher
import config

# Import handlers
from handlers.start import router as start_router
from handlers.help import router as help_router
from handlers.admin import router as admin_router
from handlers.fallback import router as fallback_router

async def main():
    bot = Bot(token=config.TOKEN)
    dp = Dispatcher()

    dp.include_router(start_router)
    dp.include_router(help_router)
    dp.include_router(admin_router)
    dp.include_router(fallback_router)

    print("Bot rodando...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
