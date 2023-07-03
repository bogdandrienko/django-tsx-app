import os
from pathlib import Path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    SECRET_KEY=(str, None),
    ALLOWED_HOSTS=(str, ""),
    DEBUG=(bool, False),
    ORACLE_DB=(str, "DISPATCHER/disp@172.30.23.16/PITENEW"),
    CORS_ALLOW_ALL_ORIGINS=(bool, False),
    CORS_URLS_REGEX=(str, ""),
    SQL_ENGINE=(str, "django.db.backends.sqlite3"),
    SQL_DATABASE=(str, "db.sqlite3"),
    SQL_USER=(str, "django_user"),
    SQL_PASSWORD=(str, "12345"),
    SQL_HOST=(str, "127.0.0.1"),
    SQL_PORT=(str, "5432"),
    REDIS_LOCATION=(str, "rediss://12345@127.0.0.1:3697/0"),
)
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")
ORACLE_DB = env("ORACLE_DB")

# logging
LOGGING_RESPONSE_CONSOLE = False
LOGGING_RESPONSE_MODEL = False
LOGGING_RESPONSE_FILE = False

LOGGING_ACTION_CONSOLE = True
LOGGING_ACTION_MODEL = True
LOGGING_ACTION_FILE = True

LOGGING_ERROR_CONSOLE = True
LOGGING_ERROR_MODEL = True
LOGGING_ERROR_FILE = True
# logging

ALLOWED_HOSTS = [env("ALLOWED_HOSTS")]

# CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOW_ALL_ORIGINS = env('CORS_ALLOW_ALL_ORIGINS')
# if env('CORS_URLS_REGEX') == "*":
#     CORS_URLS_REGEX = r"^/.*$"
# elif env('CORS_URLS_REGEX') == "":
#     pass
# else:
#     CORS_URLS_REGEX = env('CORS_URLS_REGEX')
#
# CORS_ORIGIN_WHITELIST = (
#     "http://localhost:8000",
#     "http://localhost:3000",
#
#     "http://127.0.0.1:8000",
#     "http://127.0.0.1:3000",
# )
# CORS_ALLOW_ALL_ORIGINS = True  # If this is used then `CORS_ALLOWED_ORIGINS` will not have any effect
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:8000",
#     "http://localhost:3000",
#
#     "http://127.0.0.1:8000",
#     "http://127.0.0.1:3000",
# ]  # If this is used, then not need to use `CORS_ALLOW_ALL_ORIGINS = True`
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     "http://localhost:8000",
#     "http://localhost:3000",
#
#     "http://127.0.0.1:8000",
#     "http://127.0.0.1:3000",
# ]
#
# CORS_ALLOW_HEADERS = [
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# ]
#
# #
# CORS_ALLOW_METHODS = [
#     "DELETE",
#     "GET",
#     "OPTIONS",
#     "PATCH",
#     "POST",
#     "PUT",
# ]

# Application definition

INSTALLED_APPS = [
    "grappelli",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "django_app",
]

MIDDLEWARE = [
    "django_app.middleware.CustomCorsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "django_settings.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend/build"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "django_settings.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

SQL_ENGINE = env("SQL_ENGINE")
if SQL_ENGINE == "django.db.backends.sqlite3":
    SQL_DATABASE = Path(BASE_DIR, env("SQL_DATABASE"))
else:
    SQL_DATABASE = env("SQL_DATABASE")
SQL_USER = env("SQL_USER")
SQL_PASSWORD = env("SQL_PASSWORD")
SQL_HOST = env("SQL_HOST")
SQL_PORT = env("SQL_PORT")

DATABASES = {
    "default": {
        "ENGINE": SQL_ENGINE,
        "NAME": SQL_DATABASE,
        "USER": SQL_USER,
        "PASSWORD": SQL_PASSWORD,
        "HOST": SQL_HOST,
        "PORT": SQL_PORT,
    }
}
DATA_UPLOAD_MAX_NUMBER_FIELDS = 100000

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "django_cache_table",
        "TIMEOUT": "120",
        "OPTIONS": {
            "MAX_ENTIES": 200,
        },
    },
    "ram_cache": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "django_ram_cache_table",
    },
    # 'extra': {
    #     'BACKEND': 'django_redis.cache.RedisCache',
    #     'LOCATION': env("REDIS_LOCATION")',
    #     'TIMEOUT': '240',
    #     'OPTIONS': {
    #         # "MAX_ENTIES": 200,
    #         "PASSWORD": "12345qwertY!"
    #     }
    # }
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

# LANGUAGE_CODE = 'en-US'
LANGUAGE_CODE = "ru"

TIME_ZONE = "Etc/GMT-6"
# TIME_ZONE = 'Asia/Almaty'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"
# STATIC_ROOT = Path(BASE_DIR, 'static')
STATICFILES_DIRS = [
    Path(BASE_DIR, "static"),
    Path(BASE_DIR, "frontend/build/static"),
]

MEDIA_URL = "media/"
MEDIA_ROOT = Path(BASE_DIR, "static/media")

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
