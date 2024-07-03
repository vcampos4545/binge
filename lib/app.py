from flask import Flask, request, jsonify
import tmdbsimple as tmdb
tmdb.API_KEY = '79082838ede4d1c5f1db4a4b9273f4c2'
tmdb.REQUESTS_TIMEOUT = (2, 5)

app = Flask(__name__)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', default='', type=str)
    if query:
        # Process the search query here, for example, perform a database search or call an external API.
        search = tmdb.Search()
        response = search.movie(query=query)
        results = {
            "message": f"Results for search query: {query}",
            "data": response["results"]  # This is where you'd include actual search results.
        }
    else:
        results = {
            "message": "No search query provided.",
            "data": []
        }
    return jsonify(results)

@app.route('/movies', methods=['GET'])
def movies():
    tmdb_id = request.args.get('tmdb_id', default='', type=str)
    data = {}
    if tmdb_id:
        movie_api = tmdb.Movies(tmdb_id)
        try:
            response = movie_api.info()
            # Map response data to Movie model fields
            new_movie_data = {
                'tmdb_id': tmdb_id,
                'title': response.get('title'), 
                'genres': [genre['name'] for genre in response.get('genres', [])],
                'runtime': response.get('runtime'),
                'release_date': response.get('release_date'),
                'cover_image': response.get('poster_path'),
                'description': response.get('overview')
            }
            data = {"message": "Retrieved movie details successfully.", "data": new_movie_data}
        except Exception as e:
            data = {
                "message": f"Details for TMDB ID: {tmdb_id}",
                "data": {}  # This is where you'd include actual movie details.
            }
    else:
        data = {
            "message": "No TMDB ID provided.",
            "data": {}
        }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
