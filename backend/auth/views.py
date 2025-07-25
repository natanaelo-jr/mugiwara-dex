from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

from .serializers import RegisterSerializer, LoginSerializer


# REGISTER
class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created"}, status=201)
        return Response(serializer.errors, status=400)


# LOGIN
class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({"message": "Login successful"}, status=200)

        # Refresh Token Cookie
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,  # ✅ em produção: True com HTTPS
            samesite="Lax",
            path="/api/auth/refresh/",
        )

        # Access Token Cookie
        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",  # necessário para acesso geral
        )

        return response


# REFRESH VIA COOKIE
class CookieTokenRefreshView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token is None:
            return Response({"error": "No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            new_refresh_token = str(refresh)  # se ROTATE_REFRESH_TOKENS estiver ativo

            res = Response({"access_token": access_token}, status=200)
            res.set_cookie(
                "access_token",
                access_token,
                httponly=True,
                samesite="Lax",
                secure=False,
                max_age=5 * 60,
            )
            res.set_cookie(
                "refresh_token",
                new_refresh_token,
                httponly=True,
                samesite="Lax",
                secure=False,
                max_age=7 * 24 * 60 * 60,
            )
            return res
        except Exception as e:
            print(f"Token error: {e}")
            return Response({"error": "Invalid refresh token"}, status=401)


# ME
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # return Response({"id": user.id, "username": user.username, "email": user.email})
        return Response(
            {
                "user": str(user),
            }
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logged out"}, status=200)
        response.delete_cookie("refresh_token", path="/api/auth/refresh/")
        response.delete_cookie("access_token", path="/")
        return response
