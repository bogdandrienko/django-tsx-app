import asyncio
import sqlite3
import aiohttp


def test_create_new_post():
    async def test():
        async with aiohttp.ClientSession() as session:
            data = {"title": "TEST", "description": "TEST"}
            async with session.post("http://127.0.0.1:8000/create", data=data) as response:
                print(response)

    asyncio.run(test())


def test_api():
    async def test():
        async with aiohttp.ClientSession() as session:
            async with session.get("http://127.0.0.1:8000/api") as response:
                data = await response.read()
                print(response)
                print(data)

    asyncio.run(test())


def test_comments():
    with sqlite3.connect("database/database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("""SELECT * FROM post_comments""")
        data = cursor.fetchall()
        print(len(data), data)
