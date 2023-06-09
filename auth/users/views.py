from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from  .serializers import UserSerializer, LeaderboardSerializer
from .models import User
from rest_framework import status
import jwt, datetime


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'jwt': token
        }
        return response
    
class PuzzleView(APIView):
    def post(self, request):
        puzzle_id =request.data['puzzleId']
        puzzle_ans = request.data['answer']
        puzzle_userans = request.data['userans']
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()           
        if user.has_solved_puzzle(puzzle_id):
            return Response({'message': 'Congratulations! You solved the puzzle.'})
        elif puzzle_ans == puzzle_userans:
            user.add_solved_puzzle(puzzle_id)
            user.solved_count += 1
            user.save()
            
            return Response({'message': '1'})
        else:
                return Response({'error': 'Incorrect answer'}, status=status.HTTP_400_BAD_REQUEST)           

class LeaderboardView(APIView):
    def get(self, request):
        leaderboard_data = User.objects.all().order_by('-solved_count')
        serializer = LeaderboardSerializer(leaderboard_data, many=True)
        return Response(serializer.data)

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()   
        
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response