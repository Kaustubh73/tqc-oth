from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, PuzzleView, LeaderboardView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('puzzle', PuzzleView.as_view()),
    path('leaderboard', LeaderboardView.as_view()),
]
