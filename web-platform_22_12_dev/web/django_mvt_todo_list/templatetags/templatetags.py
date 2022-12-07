from datetime import datetime
from django import template


register = template.Library()


@register.filter(name='lower', is_safe=True)
def lower_text(value: str) -> str:
    return value.lower()


@register.filter(name='cut_string', is_safe=True)
def cut_text(value: str, arg: int) -> str:
    if len(value) > arg:
        return f"{value[0:arg]}..."
    return value


@register.filter(name='cut', is_safe=True)
def strip_text(value: str, arg: str) -> str:
    return value.replace(arg, '')


@register.simple_tag(name='current_time')
def current_time(format_string: str) -> datetime:
    return datetime.datetime.now().strftime(format_string)


@register.simple_tag(name='text_upper_case', takes_context=True)
def text_upper_case(context: dict, text: str) -> str:
    request = context["request"]
    return text.upper()


@register.simple_tag(name='access_tag', takes_context=True)
def access_tag(context: dict, slug: str) -> bool:
    request = context["request"]
    return True


@register.simple_tag(name='truncate_float', takes_context=True)
def truncate_float(context: dict, target: any, count: int) -> str:
    request = context["request"]
    try:
        sides = str(target).split('.')
        left = sides[0]
        right = str(sides[1])[0:count:1]
        return f"{left}.{right}"
    except Exception as error:
        print(error)
        return target
