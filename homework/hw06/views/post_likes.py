import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import get_authorized_user_ids, can_view_post
import flask_jwt_extended


class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        
    @flask_jwt_extended.jwt_required()
    def post(self):
        # TODO: Add POST logic...
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

            existing_like = LikePost.query.filter_by(user_id=self.current_user.id, post_id=post_id).first()
            if existing_like:
                return Response(
                    json.dumps({"message": "Post already liked!"}),
                    mimetype="application/json",
                    status=400,
                )


            like = LikePost(user_id=self.current_user.id, post_id=post_id)
            db.session.add(like)
            db.session.commit()

            return Response(
                json.dumps(like.to_dict()),
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


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        # TODO: Add Delete Logic...
        print(id)
        like = LikePost.query.get(id)

        if not like:
            return Response(
                json.dumps({"message": "Bookmark not found!"}),
                mimetype="application/json",
                status=404,
            )

        if like.user_id != self.current_user.id:
                return Response(
                json.dumps({"message": "bookmark not found!"}),
                mimetype="application/json",
                status=404,
            )
        
        db.session.delete(like)
        db.session.commit()
        return Response(
            json.dumps({"message" : "bookmark deleted!"}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
