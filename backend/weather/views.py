from django.http import JsonResponse
import requests
import os

def get_weather(request, city):
    # Load the API key from environment variables
    API_KEY = os.getenv("OPENWEATHERMAP_API_KEY", "your_default_api_key")
    if not city:
        return JsonResponse({"error": "City name cannot be empty"}, status=400)
    
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    try:
        # Make a request to the OpenWeatherMap API
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raise an error for HTTP codes 4xx/5xx
        
        data = response.json()
        
        # Extract relevant information
        return JsonResponse({
            "city": city,
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"]
        })
    
    except requests.exceptions.RequestException as e:
        # Handle exceptions (e.g., timeout, network issues)
        return JsonResponse({"error": "Failed to fetch weather data", "details": str(e)}, status=500)
    
    except KeyError:
        # Handle unexpected response format
        return JsonResponse({"error": "Unexpected response format from API"}, status=500)
