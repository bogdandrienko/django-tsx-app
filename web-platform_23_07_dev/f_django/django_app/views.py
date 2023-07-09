import datetime
import time
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response


def drf_decorator(auth=True) -> any:
    def __request(func_controller: callable) -> any:
        # @authentication_classes([BasicAuthentication])
        # @parser_classes([JSONParser])  # JSONParser MultiPartParser

        def __wrapper(_request: Request, pk=0) -> Response:
            time_start_func = time.perf_counter_ns()
            if auth:
                raise Exception("Need Authentification!")
            response = func_controller(_request)
            with open('static/log.txt', mode='a', encoding="utf-8") as file:
                text = f"[{str(datetime.datetime.now())[0:-5:1]}] ({round((time.perf_counter_ns() - time_start_func) / 1000000, 5)} s) ({_request.method})"
                print(f"\n{text}")
                file.write(f"{text}\n")
            return response

        return __wrapper

    return __request


@permission_classes([AllowAny])  # AllowAny, IsAuthenticated, IsAdminUser
@api_view(http_method_names=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"])
@drf_decorator(auth=False)
def api(request):
    return Response({"message": "API OK"}, status.HTTP_200_OK)
