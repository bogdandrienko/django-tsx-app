# лайки, комменты, рейтинги, отзывы, рецензия...

vrachi = [
    {"username": "B", "rating": 22},
    {"username": "H", "rating": 66},
    {"username": "K", "rating": -2},
]

print(vrachi)


def for_sort(user: dict):
    return user["rating"]


vrachi.sort(reverse=True, key=for_sort)
print(vrachi)

print(sorted(vrachi, reverse=False, key=lambda x: x["rating"]))
