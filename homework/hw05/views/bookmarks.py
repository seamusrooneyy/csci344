import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids, can_view_post


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # TODO: Add GET Logic...
        # Got help from chatgpt on how to create a list of bookmarks that only the user follows in such simple code
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id).all()
        bookmarked_posts = [bookmark.to_dict() for bookmark in bookmarks]
        return Response(
            json.dumps(bookmarked_posts),
            mimetype="application/json",
            status=200,
        )

    def post(self):
        # TODO: Add POST Logic...
        # Used chatgpt to help with checking if the bookmark already existed
        data = request.json
        post_id = data.get('post_id')
        if post_id is None:
            return Response(json.dumps({"message":"no post id!"}), mimetype="application/json", status=400)

        try:
                post_id = int(post_id)  # Try to convert the post_id to an integer
        except ValueError:
                return Response(
                json.dumps({"message": "post_id must be a valid integer!"}),
                mimetype="application/json",
                status=400,
            )

        can_view = can_view_post(post_id, self.current_user)
        if can_view:
            post = Post.query.get(post_id)

            if not post:
                return Response(json.dumps({"message":"post id not found!"}), mimetype="application/json", status=404)

            existing_bookmark = Bookmark.query.filter_by(user_id=self.current_user.id, post_id=post_id).first()
            if existing_bookmark:
                return Response(
                    json.dumps({"message": "Post already bookmarked!"}),
                    mimetype="application/json",
                    status=400,
                )


            bookmark = Bookmark(user_id=self.current_user.id, post_id=post_id)
            db.session.add(bookmark)
            db.session.commit()

            return Response(
                json.dumps(bookmark.to_dict()),
                mimetype="application/json",
                status=201,
            )
        else:
            # return 
            return Response(
            json.dumps({"Message": f"Post id = {id} not found"}),
            mimetype="application/json",
            status=404,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add Delete Logic...
        print(id)
        bookmark = Bookmark.query.get(id)

        if not bookmark:
            return Response(
                json.dumps({"message": "Bookmark not found!"}),
                mimetype="application/json",
                status=404,
            )

        if bookmark.user_id != self.current_user.id:
                return Response(
                json.dumps({"message": "bookmark not found!"}),
                mimetype="application/json",
                status=404,
            )
        
        db.session.delete(bookmark)
        db.session.commit()
        return Response(
            json.dumps({"message" : "bookmark deleted!"}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
