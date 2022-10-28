import re
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from django_app import models as django_models, serializers as django_serializers, utils as django_utils

http_method_names = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]


# Create your views here.

def index(request):
    try:
        context = {}
        return render(request, "build/index.html", context=context)
    except Exception as error:
        if settings.DEBUG:
            print(f"error {error}")
        return django_utils.DjangoClass.DRFClass.RequestClass.return_global_error(request=request, error=error)





class Django:
    @staticmethod
    def request(_api_view=True, _http_method_names=None, _permission_classes=None):
        if _http_method_names is None:
            _http_method_names = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
        if _permission_classes is None:
            _permission_classes = [AllowAny]  # AllowAny, IsAuthenticated, IsAdminUser

        def decorator(func):
            @api_view(http_method_names=_http_method_names)
            @permission_classes(_permission_classes)
            # @authentication_classes([BasicAuthentication])
            def wrapper(*args, **kwargs):
                request = args[0]
                req_inst = django_utils.DjangoClass.TemplateClass.request(request=request)
                args = list(args)
                args.insert(1, req_inst)  # args.append(req_inst)
                args = tuple(args)

                result = None
                try:
                    result = func(*args, **kwargs)  # вызов контроллер-функции
                    django_utils.DjangoClass.TemplateClass.response(request=request,
                                                                    response=result.data)  # логирование действия
                except Exception as error:  # ловля исключение в контроллер-функции
                    django_utils.DjangoClass.LoggingClass.error(request=request, error=error)  # логирование ошибки
                    result = Response(data={"error": req_inst.action_type_error(error)},
                                      status=status.HTTP_400_BAD_REQUEST)  # формирование ошибки
                finally:
                    return result  # возврат результата работы функции

            return wrapper  # возврат декоратора

        return decorator  # возврат конструктора декоратора


@Django.request()
def user(request: HttpRequest, django_request: django_utils.DjangoClass.DRFClass.RequestClass, pk=0) -> Response:
    if pk:
        if django_request.method == "GET":
            # TODO get one user
            user = User.objects.get(id=pk)
            response = django_serializers.UserSerializer(user, many=False).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif django_request.method == "PUT" or django_request.method == "PATCH":
            # TODO update user
            password = django_request.get_value(key="username", default='')
            user = User.objects.get(id=pk)
            user.set_password(password)
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
        elif django_request.method == "PUT" or django_request.method == "PATCH":
            # TODO delete user
            user = User.objects.get(id=pk)
            user.delete()
            return Response(data={"response:": "Успешно"}, status=status.HTTP_200_OK)
    else:
        if django_request.method == "GET":
            # TODO get all users
            users = User.objects.all()
            response = django_serializers.UserSerializer(users, many=True).data
            return Response(data={"response": response}, status=status.HTTP_200_OK)
        elif django_request.method == "POST":
            # TODO create user
            username = django_request.get_value(key="username", default='')
            password = django_request.get_value(key="username", default='')
            if username and password:
                if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password) and \
                        re.match(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", username):
                    User.objects.create(
                        username=username,
                        password=make_password(password)
                    )
                    return Response(data={"response:": "Успешно"}, status=status.HTTP_201_CREATED)
                else:
                    return Response(data={"error:": "Вы не прошли проверку регулярного выражения"},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(data={"error:": "Данные не заполнены"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={"error": django_request.not_allowed_method()}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(http_method_names=http_method_names)
@permission_classes([AllowAny])
def registration(request):
    if request.method == "GET":
        return Response(data={"ответ:": r'(POST){"email": "admin@gmail.com", "password": "12345qwe!Brty"} '
                                        '=> <Response 201>'},
                        status=status.HTTP_200_OK)
    elif request.method == "POST":
        try:
            email = request.data.get("email", None)
            password = request.data.get("password", None)
            if email and password:
                if re.match(r"^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", password) and \
                        re.match(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", email):
                    User.objects.create(
                        username=email,
                        email=email,
                        password=make_password(password)  # для create НУЖНО шифровать пароль, для create_user НЕТ!
                    )
                    return Response(status=status.HTTP_201_CREATED)
                else:
                    return Response(data={"ответ:": "Вы не прошли проверку регулярного выражения"},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response(data=str(error), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            data={"response": "метод не реализован"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

# from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
# from django.shortcuts import render, redirect
# from django.http import HttpResponse
# from django.urls import reverse
#
# from backend import utils as backend_service, models as backend_models
#
# # Create your views here.
# from backend.models import UserModel
# from backend_native.models import IdeaTestModel, IdeaTestCommentModel, IdeaTestRatingModel
#
#
# def home(request):
#     return HttpResponse("<h1>This is a Home Page</h1>")
#
#
# def about(request):
#     context = {"username": "Bogdan"}
#     return render(request, 'about.html', context)
#
#
# def idea_create(request):
#     response = 0
#     category = IdeaTestModel.get_all_category()
#     if request.method == 'POST':
#         author = UserModel.objects.get(user=request.user)
#         name_char_field = request.POST.get("name_char_field")
#         category_slug_field = request.POST.get("category_slug_field")
#         short_description_char_field = request.POST.get("short_description_char_field")
#         full_description_text_field = request.POST.get("full_description_text_field")
#         avatar_image_field = request.FILES.get("avatar_image_field")
#         addiction_file_field = request.FILES.get("addiction_file_field")
#         IdeaTestModel.objects.create(
#             author=author,
#             name_char_field=name_char_field,
#             category_slug_field=category_slug_field,
#             short_description_char_field=short_description_char_field,
#             full_description_text_field=full_description_text_field,
#             avatar_image_field=avatar_image_field,
#             addiction_file_field=addiction_file_field,
#             is_visible=False,
#         )
#
#         response = 1
#     context = {
#         'response': response,
#         'category': category,
#     }
#     return render(request, 'idea/idea_create.html', context)
#
#
# def idea_change(request, idea_int):
#     response = 0
#     idea = IdeaTestModel.objects.get(id=idea_int)
#     users = UserModel.objects.all()
#     categoryes = IdeaTestModel.get_all_category()
#     if request.method == 'POST':
#         author_id = request.POST.get("author_id")
#         author = UserModel.objects.get(id=author_id)
#         name_char_field = request.POST.get("name_char_field")
#         category_slug_field = request.POST.get("category_slug_field")
#         short_description_char_field = request.POST.get("short_description_char_field")
#         full_description_text_field = request.POST.get("full_description_text_field")
#         avatar_image_field = request.FILES.get("avatar_image_field")
#         addiction_file_field = request.FILES.get("addiction_file_field")
#
#         if author and author != idea.author:
#             idea.author = author
#         if name_char_field and name_char_field != idea.name_char_field:
#             idea.name_char_field = name_char_field
#         if category_slug_field and category_slug_field != idea.category_slug_field:
#             idea.category_slug_field = category_slug_field
#         if short_description_char_field and short_description_char_field != idea.short_description_char_field:
#             idea.short_description_char_field = short_description_char_field
#         if full_description_text_field and full_description_text_field != idea.full_description_text_field:
#             idea.full_description_text_field = full_description_text_field
#         if avatar_image_field and avatar_image_field != idea.avatar_image_field:
#             idea.avatar_image_field = avatar_image_field
#         if addiction_file_field and addiction_file_field != idea.addiction_file_field:
#             idea.addiction_file_field = addiction_file_field
#
#         idea.save()
#         response = 1
#     context = {
#         'response': response,
#         'idea': idea,
#         'users': users,
#         'categoryes': categoryes,
#     }
#     return render(request, 'idea/idea_change.html', context)


# class PaginationClass:
#     @staticmethod
#     def paginate(request, objects, num_page):
#         paginator = Paginator(objects, num_page)
#         pages = request.GET.get('page')
#         try:
#             page = paginator.page(pages)
#         except PageNotAnInteger:
#             page = paginator.page(1)
#         except EmptyPage:
#             page = paginator.page(paginator.num_pages)
#         return page
#
#
# def idea_list(request, category_slug='All'):
#     categoryes = IdeaTestModel.get_all_category()
#     num_page = 5
#     if category_slug == 'idea_change_visibility':
#         ideas = IdeaTestModel.objects.filter(is_visible=False)
#     elif category_slug.lower() != 'all':
#         ideas = IdeaTestModel.objects.filter(category_slug_field=category_slug, is_visible=True)
#     else:
#         ideas = IdeaTestModel.objects.filter(is_visible=True)
#     if request.method == 'POST':
#         search_char_field = request.POST.get("search_char_field")
#         if search_char_field:
#             ideas = ideas.filter(name_char_field__icontains=search_char_field)
#         num_page = 100
#     page = PaginationClass.paginate(request=request, objects=ideas, num_page=num_page)
#     response = 0
#     context = {
#         'response': response,
#         'page': page,
#         'categoryes': categoryes,
#     }
#     return render(request, 'idea/idea_list.html', context)
#
#
# def idea_change_visibility(request, idea_int):
#     if request.method == 'POST':
#         status = request.POST.get("hidden")
#         if status == 'true':
#             status = True
#         elif status == 'false':
#             status = False
#         data = IdeaTestModel.objects.get(id=idea_int)
#         data.is_visible = status
#
#         data.save()
#     return redirect(reverse('backend_native:django_idea_list', args=()))
#
#
# def idea_view(request, idea_int):
#     idea = IdeaTestModel.objects.get(id=idea_int)
#     comments = IdeaTestCommentModel.objects.filter(idea_foreign_key_field=idea)
#     page = PaginationClass.paginate(request=request, objects=comments, num_page=5)
#     response = 0
#     context = {
#         'response': response,
#         'idea': idea,
#         'page': page,
#     }
#     return render(request, 'idea/idea_view.html', context)
#
#
# def idea_like(request, idea_int):
#     idea = IdeaTestModel.objects.get(id=idea_int)
#     author = UserModel.objects.get(user=request.user)
#     if request.POST['status'] == 'like':
#         try:
#             IdeaTestRatingModel.objects.get(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=True
#             ).delete()
#         except Exception as error:
#             IdeaTestRatingModel.objects.create(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=True
#             )
#         try:
#             IdeaTestRatingModel.objects.get(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=False
#             ).delete()
#         except Exception as error:
#             pass
#     else:
#         try:
#             IdeaTestRatingModel.objects.get(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=False
#             ).delete()
#         except Exception as error:
#             IdeaTestRatingModel.objects.create(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=False
#             )
#             IdeaTestCommentModel.objects.create(
#                 author=UserModel.objects.get(user=request.user),
#                 idea_foreign_key_field=IdeaTestModel.objects.get(id=idea_int),
#                 text_field=request.POST['text_field']
#             )
#         try:
#             IdeaTestRatingModel.objects.get(
#                 author=author,
#                 idea_foreign_key_field=idea,
#                 status_boolean_field=True
#             ).delete()
#         except Exception as error:
#             pass
#     return redirect(reverse('backend_native:django_idea_view', args=(idea_int,)))
#
#
# def idea_comment(request, idea_int):
#     if request.method == 'POST':
#         IdeaTestCommentModel.objects.create(
#             author=UserModel.objects.get(user=request.user),
#             idea_foreign_key_field=IdeaTestModel.objects.get(id=idea_int),
#             text_field=request.POST.get("text_field")
#         )
#     return redirect(reverse('backend_native:django_idea_view', args=(idea_int,)))
#
#
# def idea_rating(request):
#     idea = IdeaTestModel.objects.order_by('-id')
#     authors = []
#     for query in idea:
#         authors.append(query.author)
#     authors_dict = {}
#     for author in authors:
#         authors_dict[author] = authors.count(author)
#     user_counts = []
#     for author in authors_dict:
#         ideas = IdeaTestModel.objects.filter(author=author)
#         total_rating = 0
#         for idea in ideas:
#             total_rating += idea.get_ratings()
#         user_counts.append(
#             {'author': author, 'count': ideas.count(), 'rating': total_rating}
#         )
#     sorted_by_rating = True
#     if request.method == 'POST':
#         if request.POST['sorted'] == 'idea':
#             sorted_by_rating = True
#         if request.POST['sorted'] == 'count':
#             sorted_by_rating = False
#     if sorted_by_rating:
#         page = sorted(user_counts, key=lambda k: k['rating'], reverse=True)
#     else:
#         page = sorted(user_counts, key=lambda k: k['count'], reverse=True)
#     page = PaginationClass.paginate(request=request, objects=page, num_page=5)
#     response = 0
#     context = {
#         'response': response,
#         'page': page,
#         'sorted': sorted_by_rating
#     }
#     return render(request, 'idea/idea_rating.html', context)
